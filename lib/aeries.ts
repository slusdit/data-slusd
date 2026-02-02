"use server";

import { auth } from "@/auth";
import sql from "mssql";
import prisma from "./db";
import { number } from "zod";

export type SchooolCredentials = {
  id: number;
  email: string;
  sc: number;
  tn: number;
  StaffID2: number | null;
  StaffID3: number | null;
}
export type SchoolTeacher = {
  ClassCalendarSequenceNumber: number;
  ClassCalendar: string;
  UserCode1: string;
  UserCode2: string;
  UserCode3: string;
  UserCode4: string;
  UserCode5: string;
  UserCode6: string;
  UserCode7: string;
  UserCode8: string;
  LowGrade: number;
  HighGrade: number;
  SchoolCode: number;
  TeacherNumber: number;
  DisplayName: string;
  FirstName: string;
  LastName: string;
  Room: string;
  EmailAddress: string;
  StaffID1: number;
  StaffID2: number;
  StaffID3: number;
  StateCourseCode: string;
  InactiveStatusCode: string;
  HighlyQualifiedStatusCode1: string;
  HighlyQualifiedStatusCode2: string;
  HighlyQualifiedStatusCode3: string;
  NextYearInactiveStatusCode: string;
};

export type SchoolAccessPermission = {
  SchoolCode: number;
  ReadOnlyAccess: boolean;
  CommunicationGroup: boolean;
};

export type PersonInfo = {
  SchoolAccessPermissions: SchoolAccessPermission[];
  ExtendedProperties: any[];
  EarlyChildhoodCertificationCode: string;
  Gender: string;
  EducationLevelCode: string;
  EthnicityCode: string;
  RaceCode1: string;
  RaceCode2: string;
  RaceCode3: string;
  RaceCode4: string;
  RaceCode5: string;
  PositionStatusCode: string;
  TotalYearsOfEduService: number;
  TotalYearsInThisDistrict: number;
  PreviousLastName: string;
  PreviousFirstName: string;
  PreviousMiddleName: string;
  NameSuffix: string;
  Address: string;
  AddressCity: string;
  AddressState: string;
  AddressZipCode: string;
  AddressZipExt: string;
  HomePhone: string;
  EmergencyContactName: string;
  EmergencyContactPhone: string;
  ID: number;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  BirthYear: number;
  BirthDate: string;
  FullTimePercentage: number;
  HireDate: string;
  LeaveDate: string | null;
  InactiveStatusCode: string;
  StateEducatorID: string;
  UserName: string;
  EmailAddress: string;
  PrimaryAeriesSchool: number;
  NetworkLoginID: string;
  AlternateEmailAddress: string;
  HumanResourcesSystemID: string;
  CellPhone: string;
  NotificationPreferenceCode: string;
  Title: string;
};

export type AeriesSimpleStaff = {
  id: number
  email: string
  schoolPermissions: number[]
  primarySchool: number
  title: string
}

export type AeriesSimpleTeacher = {
  psl: number;
  email: string;
  sc: number;
  tn: number;
  StaffID2: number | null;
  StaffID3: number | null;
}
// const prisma = new PrismaClient();

// Import school year utilities for local use
// NOTE: These are NOT re-exported because this is a "use server" file.
// Import directly from './schoolYear' for these utilities.
import {
  DEFAULT_DB_YEAR,
  getDatabaseName,
} from './schoolYear';

// Define the base configuration for SQL Server (without database)
const baseConfig = {
  user: process.env.DB_USER, // Your SQL Server username
  password: process.env.DB_PASSWORD, // Your SQL Server password
  server: process.env.DB_SERVER, // Your SQL Server hostname or IP
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

// Pool cache for multiple database connections
const poolCache: Map<string, Promise<sql.ConnectionPool>> = new Map();

// Get or create a connection pool for a specific database
async function getPoolForDatabase(database: string): Promise<sql.ConnectionPool> {
  if (!poolCache.has(database)) {
    const config = {
      ...baseConfig,
      database,
    };
    // @ts-ignore
    const poolPromise = new sql.ConnectionPool(config)
      .connect()
      .then((pool) => {
        return pool;
      })
      .catch((err) => {
        console.error(`Database Connection Failed for ${database}! Bad Config: `, err);
        poolCache.delete(database); // Remove failed pool from cache
        throw err;
      });
    poolCache.set(database, poolPromise);
  }
  return poolCache.get(database)!;
}

// Default pool for backwards compatibility (uses DB_DATABASE from env or default year)
const defaultDatabase = process.env.DB_DATABASE || getDatabaseName(DEFAULT_DB_YEAR);
// @ts-ignore
const poolPromise = getPoolForDatabase(defaultDatabase);

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
  // Use parameterized query to prevent SQL injection
  request.input('email', sql.VarChar, email);
  const query = `Select sc from tch
 where em = @email
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

  // console.log(schoolCode);

  return schoolCode;
}

export async function removeCommentsFromQuery(query: string) {
  let cleanedQuery = query;
  // Remove single-line comments (--)
  cleanedQuery = query.replace(/\-\-[^,]*[\n\r]*[^,]*,/gm, '');

  // Remove multi-line comments (/* ... */)
  cleanedQuery = cleanedQuery.replace(/\/\*[\s\S]*?\*\//gm, '');

  return cleanedQuery;
}

/**
 * Validates and sanitizes school codes to prevent SQL injection
 * Ensures all values are valid integers
 * @param schoolCodes - Single school code or array of school codes
 * @returns Validated array of school codes as numbers
 */
function validateSchoolCodes(schoolCodes: string | number | (string | number)[] | undefined): number[] {
  if (schoolCodes === undefined || schoolCodes === null) {
    return [];
  }

  const codesArray = Array.isArray(schoolCodes) ? schoolCodes : [schoolCodes];

  const validated = codesArray.map(code => {
    const numCode = typeof code === 'string' ? parseInt(code, 10) : code;
    if (isNaN(numCode) || !Number.isInteger(numCode)) {
      throw new Error(`Invalid school code: ${code}. School codes must be integers.`);
    }
    return numCode;
  });

  return validated;
}

/**
 * Validates that a query only contains SELECT and UNION statements (whitelist approach)
 * This prevents SQL injection by only allowing read-only queries
 * @param query - The SQL query to validate
 * @throws Error if query contains non-whitelisted operations
 */
function validateQueryWhitelist(query: string): void {
  // Remove comments first to prevent bypass attempts
  let cleanQuery = query;

  // Remove single-line comments (--)
  cleanQuery = cleanQuery.replace(/--[^\r\n]*/g, '');

  // Remove multi-line comments (/* ... */)
  cleanQuery = cleanQuery.replace(/\/\*[\s\S]*?\*\//g, '');

  // Normalize whitespace and convert to lowercase for analysis
  const normalized = cleanQuery.replace(/\s+/g, ' ').trim().toLowerCase();

  // Check if query is empty after removing comments
  if (!normalized || normalized.length === 0) {
    throw new Error("Query is empty or contains only comments");
  }

  // Split by common statement separators (semicolon) to check each statement
  const statements = normalized.split(';').filter(s => s.trim().length > 0);

  for (const statement of statements) {
    const trimmed = statement.trim();

    // Each statement must start with SELECT or be part of a UNION
    // We also need to handle CTEs (WITH clause) which are read-only
    const startsWithSelect = /^select\s/.test(trimmed);
    const startsWithWith = /^with\s/.test(trimmed); // CTEs (Common Table Expressions)
    const isUnionPart = /union\s+(all\s+)?select\s/.test(trimmed);

    if (!startsWithSelect && !startsWithWith && !isUnionPart) {
      throw new Error(`Query validation failed: Only SELECT and UNION queries are allowed. Found: ${trimmed.substring(0, 50)}...`);
    }
  }

  // Blocklist dangerous keywords that should never appear in SELECT queries
  const dangerousKeywords = [
    'drop', 'delete', 'insert', 'update', 'alter', 'create', 'truncate',
    'exec', 'execute', 'xp_cmdshell', 'sp_executesql', 'merge', 'grant',
    'revoke', 'deny', 'backup', 'restore', 'bulk'
  ];

  const foundDangerous = dangerousKeywords.filter(keyword => {
    // Use word boundaries to avoid false positives (e.g., "select" contains "elect")
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    return regex.test(normalized);
  });

  if (foundDangerous.length > 0) {
    throw new Error(`Query validation failed: Dangerous keywords detected: ${foundDangerous.join(', ')}`);
  }
}

/**
 * Helper function to run a parameterized query with proper SQL injection protection
 * @param query - SQL query with parameter placeholders (@param1, @param2, etc.)
 * @param parameters - Object mapping parameter names to their values
 * @param options - Optional database year override
 * @returns Query results
 */
export async function runParameterizedQuery(
  query: string,
  parameters: Record<string, { type: any; value: any }> = {},
  options?: { dbYear?: number }
) {
  try {
    const session = await auth();

    // Validate query using whitelist approach (only SELECT and UNION allowed)
    validateQueryWhitelist(query);

    const cleanQuery = await removeCommentsFromQuery(query);

    // Get database year from options, session, or default
    const dbYear = options?.dbYear ?? (session?.user as any)?.activeDbYear ?? DEFAULT_DB_YEAR;
    const database = getDatabaseName(dbYear);
    const pool = await getPoolForDatabase(database);

    const request = pool.request();

    // Add all parameters to the request
    for (const [name, param] of Object.entries(parameters)) {
      request.input(name, param.type, param.value);
    }

    const result = await request.query(cleanQuery);
    return result.recordset;
  } catch (error) {
    console.error("Error in runParameterizedQuery:", error);
    throw error;
  }
}

// Function to execute a query
export async function runQuery(
  query: string,
  options?: { dbYear?: number } // Optional: override database year
) {

  try {

    const session = await auth();

    // Validate query using whitelist approach (only SELECT and UNION allowed)
    validateQueryWhitelist(query);

    let cleanQuery = await removeCommentsFromQuery(query);

    // Get database year from options, session, or default
    const dbYear = options?.dbYear ?? (session?.user as any)?.activeDbYear ?? DEFAULT_DB_YEAR;
    const database = getDatabaseName(dbYear);
    const pool = await getPoolForDatabase(database);
    // console.log(query)
    const request = pool.request();
    try {

      try {
        let result;

        // Handle @@sc variable (user's allowed schools)
        if (query.includes("@@sc")) {
          const schoolCode = session?.user?.schools;

          if (schoolCode === "0") {
            // User has access to all schools
            const allSchools = await prisma.schoolInfo.findMany({
              select: { sc: true },
            });
            // Validate all school codes are integers
            const validatedSchools = validateSchoolCodes(allSchools.map(s => s.sc));
            const schoolList = validatedSchools.join(",");

            query = query.replace("= @@sc", `in (${schoolList})`);
          } else {
            // Validate and sanitize school codes before injection
            const validatedSchools = validateSchoolCodes(schoolCode);

            if (validatedSchools.length === 1) {
              query = query.replace(/@@sc/g, validatedSchools[0].toString());
            } else if (validatedSchools.length > 1) {
              const schoolList = validatedSchools.join(",");
              query = query.replace("= @@sc", `in (${schoolList})`);
              query = query.replace(/@@sc/g, validatedSchools[0].toString()); // Fallback for non-IN usage
            }
          }
        }

        // Handle @@psc variable (user's primary school code)
        if (query.includes("@@psc")) {
          const primarySchool = session?.user?.primarySchool;
          // Validate primary school is a valid integer
          const validatedPrimary = validateSchoolCodes(primarySchool);

          if (validatedPrimary.length > 0) {
            query = query.replace(/@@psc/g, "'" + validatedPrimary[0] + "'");
          } else {
            throw new Error("Invalid primary school code");
          }
        }

        // Handle @@asc variable (user's active school code)
        if (query.includes("@@asc")) {
          const activeSchool = session?.user?.activeSchool;

          if (activeSchool === undefined || activeSchool === null) {
            // No active school set - return no data (use impossible school code)
            query = query.replace(/@@asc/g, "'-1'");
          } else if (activeSchool === 0) {
            // District-wide view (0) - query all schools
            const schools = await prisma.schoolInfo.findMany({
              select: { sc: true },
            });
            // Validate all school codes
            const validatedSchools = validateSchoolCodes(schools.map(s => s.sc));
            const allSchoolSc = validatedSchools.map(sc => `'${sc}'`).join(", ");

            // Handle both "= @@asc" and just "@@asc" patterns
            query = query.replace("= @@asc", `in (${allSchoolSc})`);
            query = query.replace(/@@asc/g, allSchoolSc);
          } else {
            // Specific school selected - validate and replace
            const validatedActive = validateSchoolCodes(activeSchool);
            query = query.replace(/@@asc/g, "'" + validatedActive[0] + "'");
          }
        }

        // Handle @TN variable
        if (query.includes("@tn")) {
          // TODO: get from session, feed in from auth() call or Aeries query
        }

        result = await request.query(query);

        // console.log("SQL result", result.recordset);
        // await closePool();
        return result.recordset;
      } catch (error) {
        // closePool();
        console.error("SQL error", error);
        throw new Error("SQL error", { cause: error });
        // setError(error)
      }
    } catch (err) {
      console.error("SQL error", err);
      // console.log(query)
      // console.log({err})

      // throw  Error("SQL Pool error", { cause: err });
    }
  } catch (error) {
    console.error("Error in runQuery:", error);
    throw error
  }
}
export async function runQueryStandalone(
  query: string,
  standalone: boolean = false,
  options?: { dbYear?: number } // Optional: override database year
) {
  let session
  try {
    if (standalone) {
      session = {
        user: {
          email:"test@slusd.us",
          activeSchool: 0,
          activeDbYear: DEFAULT_DB_YEAR,
        }
      }
    } else {

      session = await auth();
    }

    // Validate query using whitelist approach (only SELECT and UNION allowed)
    validateQueryWhitelist(query);

    let cleanQuery = await removeCommentsFromQuery(query);

    // Get database year from options, session, or default
    const dbYear = options?.dbYear ?? (session?.user as any)?.activeDbYear ?? DEFAULT_DB_YEAR;
    const database = getDatabaseName(dbYear);
    const pool = await getPoolForDatabase(database);
    // console.log(query)
    const request = pool.request();
    try {

      try {
        let result;

        // Handle @@sc variable (user's allowed schools)
        if (query.includes("@@sc")) {
          const schoolCode = session?.user?.schools;

          if (schoolCode === "0") {
            // User has access to all schools
            const allSchools = await prisma.schoolInfo.findMany({
              select: { sc: true },
            });
            // Validate all school codes are integers
            const validatedSchools = validateSchoolCodes(allSchools.map(s => s.sc));
            const schoolList = validatedSchools.join(",");

            query = query.replace("= @@sc", `in (${schoolList})`);
          } else {
            // Validate and sanitize school codes before injection
            const validatedSchools = validateSchoolCodes(schoolCode);

            if (validatedSchools.length === 1) {
              query = query.replace(/@@sc/g, validatedSchools[0].toString());
            } else if (validatedSchools.length > 1) {
              const schoolList = validatedSchools.join(",");
              query = query.replace("= @@sc", `in (${schoolList})`);
              query = query.replace(/@@sc/g, validatedSchools[0].toString()); // Fallback for non-IN usage
            }
          }
        }

        // Handle @@psc variable (user's primary school code)
        if (query.includes("@@psc")) {
          const primarySchool = session?.user?.primarySchool;
          // Validate primary school is a valid integer
          const validatedPrimary = validateSchoolCodes(primarySchool);

          if (validatedPrimary.length > 0) {
            query = query.replace(/@@psc/g, "'" + validatedPrimary[0] + "'");
          } else {
            throw new Error("Invalid primary school code");
          }
        }

        // Handle @@asc variable (user's active school code)
        if (query.includes("@@asc")) {
          const activeSchool = session?.user?.activeSchool;

          if (activeSchool === undefined || activeSchool === null) {
            // No active school set - return no data (use impossible school code)
            query = query.replace(/@@asc/g, "'-1'");
          } else if (activeSchool === 0) {
            // District-wide view (0) - query all schools
            const schools = await prisma.schoolInfo.findMany({
              select: { sc: true },
            });
            // Validate all school codes
            const validatedSchools = validateSchoolCodes(schools.map(s => s.sc));
            const allSchoolSc = validatedSchools.map(sc => `'${sc}'`).join(", ");

            // Handle both "= @@asc" and just "@@asc" patterns
            query = query.replace("= @@asc", `in (${allSchoolSc})`);
            query = query.replace(/@@asc/g, allSchoolSc);
          } else {
            // Specific school selected - validate and replace
            const validatedActive = validateSchoolCodes(activeSchool);
            query = query.replace(/@@asc/g, "'" + validatedActive[0] + "'");
          }
        }

        // Handle @TN variable
        if (query.includes("@tn")) {
          // TODO: get from session, feed in from auth() call or Aeries query
        }

        result = await request.query(query);

        // console.log("SQL result", result.recordset);
        // await closePool();
        return result.recordset;
      } catch (error) {
        // closePool();
        console.error("SQL error", error);
        throw new Error("SQL error", { cause: error });
        // setError(error)
      }
    } catch (err) {
      console.error("SQL error", err);
      // console.log(query)
      // console.log({err})

      // throw  Error("SQL Pool error", { cause: err });
    }
  } catch (error) {
    console.error("Error in runQuery:", error);
    throw error
  }
}


// Function to close the pool (useful for clean shutdowns)
export async function closePool() {
  const pool = await poolPromise;
  try {
    await pool.close();
    // console.log("Connection pool closed");
  } catch (err) {
    console.error("Error closing pool", err);
    throw err;
  }
}

/**
 * Retrieves the list of school codes based on the given PersonInfo data.
 *
 * @param {PersonInfo} data - The data containing SchoolAccessPermissions and PrimaryAeriesSchool
 * @return {number[]} The array of school codes extracted from SchoolAccessPermissions
 */
function getSchools(data: PersonInfo) {
  if (data.SchoolAccessPermissions.length === 0) return [data.PrimaryAeriesSchool]
  let schools = data.SchoolAccessPermissions.map(s => s.SchoolCode)
  return schools
}

/*
 * Helper Functions
 */

/**
 * Checks if any object in the array matches the specified keys from the input object.
 *
 * @param {any} obj1 - The object to compare keys from.
 * @param {any[]} array2 - An array of objects to compare against.
 * @param {string} key1 - The first key to compare.
 * @param {string} key2 - The second key to compare.
 * @return {boolean} Returns true if any object in the array matches the specified keys, false otherwise.
 */
export async function isMatched(obj1: any, array2: any[], key1: string, key2: string) {
  const objKey = obj1[key1]
  // console.log({ obj1, array2, key1, key2, objKey });
  return array2.some(obj2 => {
    // console.log(obj1[key1] === obj2[key1] && obj1[key2] === obj2[key2])
    return obj1[key1] === obj2[key1] && obj1[key2] === obj2[key2]
  });
}

/* 
 * Aeries API Section
 */



/**
 * Retrieves the staff information from the Aeries API.
 * 
 *  !! Feature: Look here for admin impersonation 
 *
 * @param {Object} options - Optional parameters for the function.
 * @param {string} options.endpoint - The endpoint to fetch the staff information from. Defaults to "/api/v5/staff".
 * @return {Promise<Object>} - A promise that resolves to an object containing the staff information.
 * The object has the following properties:
 * - id: The ID of the staff member.
 * - email: The email address of the staff member.
 * - schoolPermissions: An array of school codes the staff member has permissions for.
 * - primarySchool: The primary school code of the staff member.
 * - title: The title of the staff member.
 */
export async function getAeriesStaff({
  email,
  endpoint = "/api/v5/staff"
}: {
  email: string
  endpoint?: string
}) {

  const cert = process.env.AERIES_API_KEY as string

  // console.log({ endpoint, email })

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AERIES_URL}${endpoint}`,
    {
      method: "GET",
      cache: "force-cache",
      headers: {
        "Content-Type": "application/json",
        "AERIES-CERT": cert
      },
    }
  );
  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data: PersonInfo[] = await response.json()
  // console.log(data)
  // console.log(email)
  let person = data.filter(p => p.EmailAddress === email)[0]
  // person = data.filter(p => p.EmailAddress === "mabadia@slusd.us")[0]
  // person = data.filter(p => p.EmailAddress === "acorona@slusd.us")[0]
  // person = data.filter(p => p.EmailAddress === "xbugarin@slusd.us")[0]
  // person = data.filter(p => p.EmailAddress === "jfox@slusd.us")[0]
  // console.log(person)
  return {
    "id": person.ID,
    "email": person.EmailAddress,
    "schoolPermissions": getSchools(person),
    "primarySchool": person.PrimaryAeriesSchool,
    "title": person.Title
  }


}


/**
 * Retrieves school credentials for a teacher based on their ID and school list.
 *
 * @param {number} id - The ID of the teacher
 * @param {number[]} schools - The list of school IDs
 * @return {Promise<any>} A Promise that resolves to the teacher information
 */
export async function getTeacherSchoolCredentials({
  id,
  schools,

}: {
  id: number
  schools: number[]
}) {
  let teacherInfo
  if (schools.length > 0) {

    teacherInfo = await Promise.all(schools.map(async (sc) => {
      // console.log(sc)
      const schoolCredentials = await getAeriesSchoolTeacher({ sc, id })
      // console.log(schoolCredentials)
      return schoolCredentials

    })
    )
  }

  teacherInfo = teacherInfo?.filter((teacher) => teacher !== null)
  return teacherInfo
}
/**
 * Retrieves a school teacher from Aeries API based on school code and teacher ID.
 *
 * @param {number} sc - The school code of the teacher.
 * @param {number} id - The ID of the teacher.
 * @return {Object} An object containing the teacher information.
 */
async function getAeriesSchoolTeacher({
  sc,
  id
}: {
  sc: number
  id: number
}) {
  const cert = process.env.AERIES_API_KEY as string
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AERIES_URL}/api/v5/schools/${sc}/teachers`,
    {
      method: "GET",
      cache: "force-cache",
      headers: {
        "Content-Type": "application/json",
        "AERIES-CERT": cert
      },
    }
  );
  // console.log(response)
  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const teachers: SchoolTeacher[] = await response.json()
  // console.log(teachers)
  // console.log('data', data)
  const person: SchoolTeacher = teachers.filter(tch => tch.StaffID1 === id)[0]
  // console.log(person)
  if (!person) {
    return null
  }
  const ret = {
    "psl": person.StaffID1,
    "email": person.EmailAddress,
    "sc": person.SchoolCode,
    "tn": person.TeacherNumber,
    "StaffID2": person.StaffID2 ? person.StaffID2 : null,
    "StaffID3": person.StaffID3 ? person.StaffID3 : null
  }
  // console.log(ret)
  return ret
}