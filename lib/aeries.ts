'use server'

import sql from 'mssql';
import { Dispatch, SetStateAction } from 'react';

// Define the configuration for your SQL Server
const config = {
  user: process.env.DB_USER,           // Your SQL Server username
  password: process.env.DB_PASSWORD,   // Your SQL Server password
  server: process.env.DB_SERVER,       // Your SQL Server hostname or IP
  database: process.env.DB_DATABASE,   // Your database name
  options: {
    encrypt: true,                     // Use encryption
    trustServerCertificate: true,      // Trust the server certificate
  },
  pool: {
    max: 10,                           // Maximum number of connections in the pool
    min: 0,                            // Minimum number of connections in the pool
    idleTimeoutMillis: 30000           // Timeout in milliseconds before an idle connection is closed
  }
};

// Create a pool instance
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed! Bad Config: ', err);
    throw err;
  });

// Function to execute a query
export async function runQuery(query: string,
  //  params: any[] = []
  ) {

    const queryBlockList = ['drop', 'update', 'insert', 'delete']
    const queryLower = query?.toLowerCase()
    if (queryBlockList.some(term => queryLower?.includes(term))) {
      throw Error('Dangerous query')
    }

    const cleanQuery = query?.replace(/\s+/g, ' ').trim();
    // const cleanRegex = /^[a-zA-Z0-9\s\(\),.=<>]+$/;
    // if (!cleanRegex.test(cleanQuery)) {
    //   throw Error('Invalid query');
    // }
  const pool = await poolPromise;
  try {
    const request = pool.request();
    // params.forEach((param, index) => {
    //   request.input(`param${index + 1}`, param);
    // });
    let result;
    try {

       result = await request.query(query);

      console.log('SQL result', result.recordset);
      // await closePool(); 
      return result.recordset;
    } catch (error) {
      closePool();
      console.error('SQL error', error);
      throw new Error('SQL error', { cause: error })
      // setError(error)
    }
  } catch (err) {
    console.error('SQL error', err);
    throw new Error('SQL error', { cause: err }) // err;
  }
}

// Function to close the pool (useful for clean shutdowns)
export async function closePool() {
  const pool = await poolPromise;
  try {
    await pool.close();
    console.log('Connection pool closed');
  } catch (err) {
    console.error('Error closing pool', err);
    throw err;
  }
}
