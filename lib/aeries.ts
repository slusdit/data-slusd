'use server'

import sql from 'mssql';

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
export async function runQuery(query?: string, params: any[] = []) {
  if(!query){
    query = "SELECT to 30 * from stu";
  }
  const pool = await poolPromise;
  try {
    const request = pool.request();
    params.forEach((param, index) => {
      request.input(`param${index + 1}`, param);
    });
    const result = await request.query(query);
    console.log('SQL result', result.recordset);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
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
