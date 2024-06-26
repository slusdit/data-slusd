"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import sql from "mssql";
import { Result } from "postcss";
import { Dispatch, SetStateAction } from "react";

const prisma = new PrismaClient();

// Define the configuration for your SQL Server
const config = {
  user: process.env.DB_USER, // Your SQL Server username
  password: process.env.DB_PASSWORD, // Your SQL Server password
  server: process.env.DB_SERVER, // Your SQL Server hostname or IP
  database: process.env.DB_DATABASE, // Your database name
  options: {
    encrypt: true, // Use encryption
    trustServerCertificate: true, // Trust the server certificate
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    idleTimeoutMillis: 30000, // Timeout in milliseconds before an idle connection is closed
  },
};

// Create a pool instance
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
   
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed! Bad Config: ", err);
    throw err;
  });

export async function getSchoolsFromEmail({
  email,
  pool,
}: {
  email?: string | null;
  pool?: sql.ConnectionPool;
}) {
  // Testing email
  if (!email) {
    email = "emcnally@slusd.us";
  }

  if (!pool) {
    pool = await poolPromise;
  }
  const request = pool.request();
  const query = `Select sc from tch
 where em = '${email}'
 and del = 0
 and tg = ''`;
  let schoolQueryResult;
  try {
    schoolQueryResult = await request.query(query);
  } catch (err) {
    console.error(err);
    throw err;
  }
  let schoolCode: string | string[] = "0";
  if (schoolQueryResult.recordset && schoolQueryResult.recordset.length !== 0) {
    schoolCode = schoolQueryResult.recordset.map((school) => school.sc);
  }
  
  console.log(schoolCode);

  return schoolCode;
}
// Function to execute a query
export async function runQuery(
  query: string
  //  params: any[] = []
) {
  const session = await auth();
  const email = session?.user?.email;
  const queryBlockList = ["drop", "update", "insert", "delete"];
  const queryLower = query?.toLowerCase();
  if (queryBlockList.some((term) => queryLower?.includes(term))) {
    throw Error("Dangerous query");
  }

  const cleanQuery = query?.replace(/\s+/g, " ").trim();

  const pool = await poolPromise;
  try {
    const request = pool.request();

    let result;
    try {
      const schoolCode = await getSchoolsFromEmail({ email,  pool }); // TODO: get from session, feed in from auth() call
      console.log(schoolCode);
      
      // Handle @SC variable
      if (query.includes("@sc")) {
        if (schoolCode === "0") {
          let allSchools:
            | {
                sc: string;
              }[]
            | string = await prisma.schoolInfo.findMany({
            select: {
              sc: true,
            },
          });
          allSchools = allSchools.map((school) => `${school.sc}`).join(",");
          console.log("All schools", allSchools);

          query = query.replace("= @sc", `in (${allSchools})`);
          console.log("Query", query);
        } else {
          if (typeof schoolCode === "string") {
            query = query.replace("@sc", schoolCode);
          }
          if (Array.isArray(schoolCode)) {
            query = query.replace("= @sc", `in (${schoolCode.join(",")})`); // TODO: make this work with comma separated school codes
          }
          console.log("Query", query);
        }
      }
      result = await request.query(query);

      console.log("SQL result", result.recordset);
      // await closePool();
      return result.recordset;
    } catch (error) {
      closePool();
      console.error("SQL error", error);
      throw new Error("SQL error", { cause: error });
      // setError(error)
    }
  } catch (err) {
    console.error("SQL error", err);
    throw new Error("SQL error", { cause: err }); // err;
  }
}

// Function to close the pool (useful for clean shutdowns)
export async function closePool() {
  const pool = await poolPromise;
  try {
    await pool.close();
    console.log("Connection pool closed");
  } catch (err) {
    console.error("Error closing pool", err);
    throw err;
  }
}
