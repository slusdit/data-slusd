"use server";

import { auth } from "@/auth";
import sql from "mssql";
import prisma from "./db";

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
// @ts-ignore
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

// Function to execute a query
export async function runQuery(
  query: string
  //  params: any[] = []
) {
  const session = await auth();
  const email = session?.user?.email;
  const queryBlockList = ["drop", "update", "insert", "delete", "modify", "alter", "create"];
  const queryLower = query?.toLowerCase();
  if (queryBlockList.some((term) => queryLower?.includes(term))) {
    throw Error("Dangerous query");
  }

  // let cleanQuery = query?.replace(/\s+/g, " ").trim();

  // cleanQuery = await removeCommentsFromQuery(cleanQuery);
  let cleanQuery = await removeCommentsFromQuery(query);

  const pool = await poolPromise;
  try {
    const request = pool.request();

    let result;
    try {

      // TEST: Remove email to test @@sc overrice
      const schoolCode = session?.user?.schools

      // console.log(schoolCode);
      // TODO: Prepend @@variables to declarations at the top of the query, rather than search and replace?
      // Handle @SC variable
      if (query.includes("@@sc")) {
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
          ;

          query = query.replace("= @@sc", `in (${allSchools})`);
          // console.log("Query", query);
        } else {
          if (typeof schoolCode === "string") {
            query = query.replace("@@sc", schoolCode);
          }
          if (Array.isArray(schoolCode)) {
            query = query.replace("= @@sc", `in (${schoolCode.join(",")})`); // TODO: make this work with comma separated school codes
          }
          // console.log("Query", query);
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
    throw new Error("SQL Pool error", { cause: err });
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

  console.log({ endpoint, email })

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
  console.log(email)
  let person = data.filter(p => p.EmailAddress === email)[0]
  // person = data.filter(p => p.EmailAddress === "mabadia@slusd.us")[0]
  // person = data.filter(p => p.EmailAddress === "acorona@slusd.us")[0]
  // person = data.filter(p => p.EmailAddress === "xbugarin@slusd.us")[0]
  // person = data.filter(p => p.EmailAddress === "jfox@slusd.us")[0]
  console.log(person)
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
      const schoolCredentials =  await getAeriesSchoolTeacher({ sc, id })
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
  // // console.log('data', data)
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