import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
// import {syncGradeDistribution} from '/home/administrator/data-slusd/lib/syncGradeDistribution'
import { auth } from "@/auth";
import sql from "mssql";
import prisma from "./db";
import { removeCommentsFromQuery, runQuery } from './lib/aeries';
import { RawGradeData } from './lib/syncGradeDistribution';
// Load environment variables
dotenv.config();

// Initialize Prisma (assuming you have it set up)
const prisma = new PrismaClient();

// You'll need to import or recreate your runQuery function
// async function runQuery(
//   query: string
//   //  params: any[] = []
// ) {
//   try {
//     const session = await auth();
//     const email = session?.user?.email;
//     const queryBlockList = ["drop", "update", "insert", "delete", "modify", "alter", "create"];
//     const queryLower = query?.toLowerCase();
//     if (queryBlockList.some((term) => queryLower?.includes(term))) {
//       throw Error("Dangerous query");
//     }

//     // let cleanQuery = query?.replace(/\s+/g, " ").trim();

//     // cleanQuery = await removeCommentsFromQuery(cleanQuery);
//     let cleanQuery = await removeCommentsFromQuery(query);

//     const pool = await poolPromise;
//     // console.log(query)
//     const request = pool.request();
//     try {

//       try {
//         let result;

//         // TEST: Remove email to test @@sc overrice
//         const schoolCode = session?.user?.schools
//         // console.log(session?.user?.schools)
//         // console.log(session?.user)

//         // console.log(schoolCode);
//         // TODO: Prepend @@variables to declarations at the top of the query, rather than search and replace?
//         // Handle @SC variable
//         if (query.includes("@@sc")) {
//           if (schoolCode === "0") {
//             let allSchools:
//               | {
//                 sc: string;
//               }[]
//               | string = await prisma.schoolInfo.findMany({
//                 select: {
//                   sc: true,
//                 },
//               });
//             allSchools = allSchools.map((school) => `${school.sc}`).join(",");
//             ;

//             query = query.replace("= @@sc", `in (${allSchools})`);

//           } else {
//             if (typeof schoolCode === "string") {
//               query = query.replace("@@sc", schoolCode);
//             }
//             if (Array.isArray(schoolCode)) {
//               query = query.replace("= @@sc", `in (${schoolCode.join(",")})`); // TODO: make this work with comma separated school codes
//             }
//             // console.log("Query", query);
//           }
//         }

//         if (query.includes("@@psc")) {
//           // if (session?.user?.manualSchool) {

//           //   query = query.replace("@@psc", "'"+ session?.user?.manualSchool + "'");
//           // } else {

//           query = query.replace("@@psc", "'" + session?.user?.primarySchool + "'");
//           // }

//         }
//         // console.log( session?.user?.activeSchool)
//         // console.log(query.includes("@@asc"))
//         if (query.includes("@@asc")) {
//           // console.log(query.includes("@@asc"))
//           if (typeof session?.user?.activeSchool === "number") {
//             // console.log("Active School", session?.user?.activeSchool)
//             // console.log("Active School", session?.user?.activeSchool === 0)

//             // } else {
//             if (session?.user?.activeSchool === 0) {
//               const schools = await prisma.schoolInfo.findMany({
//                 select: {
//                   sc: true,
//                 },
//               })
//               // console.log(schools)
//               const allSchoolSc = "'" + schools.map((school) => `${school.sc}`).join("', '") + "'";
//               // console.log('Schools', schools, allSchoolSc)

//               query = query.replace("= @@asc", `in (${allSchoolSc})`);

//             } else {

//               query = query.replace("@@asc", "'" + session?.user?.activeSchool + "'");
//             }

//             query = query.replace("@@asc", "'" + session?.user?.primarySchool + "'");
//           }

//         }
//         // console.log("Query", query);


//         // Handle @TN variable
//         if (query.includes("@tn")) {
//           // TODO: get from session, feed in from auth() call or Aeries query
//         }

//         // console.log("Query", query);
//         result = await request.query(query);

//         // console.log("SQL result", result.recordset);
//         // await closePool();
//         return result.recordset;
//       } catch (error) {
//         // closePool();
//         console.error("SQL error", error);
//         throw new Error("SQL error", { cause: error });
//         // setError(error)
//       }
//     } catch (err) {
//       console.error("SQL error", err);
//       // console.log(query)
//       // console.log({err})

//       // throw  Error("SQL Pool error", { cause: err });
//     }
//   } catch (error) {
//     console.error("Error in runQuery:", error);
//     throw error
//   }
// }


// // Your function (remove the export)
async function syncGradeDistribution() {
const percentQueryId = process.env.QUERY_ASSESSMENT_GRADE_PERCENTAGE;
  const resultsPercent = await prisma.query.findUnique({
    where: { id: percentQueryId },
  });
  if (!resultsPercent?.query) {
    throw new Error(
      "Query is undefined. Please ensure the query is properly configured."
    );
  }
  console.log("Starting grade distribution sync...");

  // const dbName = await runQuery('select DB_NAME() [db_name]')
  // console.log(`Current ${dbName.length} database: ${dbName?.map((db) => db.db_name)[0]}`);

  try {

    const rawData = (await runQuery(resultsPercent.query, true)) as RawGradeData[];
  console.log(`Fetched ${rawData.length} records from SQL Server.`);

    // Delete existing data for the current school year to avoid duplicates
    const schoolYears = Array.from(
      new Set(rawData.map((record) => record["School Year"]))
    );

    for (const schoolYear of schoolYears) {
      await prisma.gradeDistribution.deleteMany({
        where: { schoolYear },
      });
    }

    console.log('Raw Data Sample', rawData[0])

    // Transform and insert data
    let transformedData: any[] = [];
    try {
      
      transformedData = rawData.map((record) => {
        
        return {
          source: record.SOURCE,
          schoolYear: record["School Year"],
          sc: record.SC[0],
          studentId: record.ID[0].toString(),
          studentNumber: record.SN[0].toString(),
          grade: record.GR.toString(),
          gender: record.GN.toString(),
          period: record.PD.toString(),
          departmentCode: record.DEPT_CODE,
          divisionCode: record.DC,
          courseNumber: record.CN.toString(),
          courseTitle: record.CO,
          teacherNumber: record.TN.toString(),
          section: record.SE.toString(),
          term: record.TERM,
          mark: record.MARK,
          teacherName: record.TE,
          specialEd: record.SpecialEd,
          ell: record.ELL,
          ard: record.ARD,
        };
      });
    } catch (error) {
      console.error("Error transforming data:", error);
      throw error;
    }

    console.log(`Transformed data from ${rawData.length} records to ${transformedData.length} records.`);
    const batchSize = 5000;
    console.log(`Transformed data into ${transformedData.length} records.`);
    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);
      await prisma.gradeDistribution.createMany({
        data: batch,
        skipDuplicates: true,
      });
      console.log(
        `Inserted batch ${i / batchSize + 1}/${Math.ceil(
          transformedData.length / batchSize
        )}`
      );
    }

    console.log("Grade distribution sync completed successfully.");


    // await aggregateTeacherGradeSummaries({});
  } catch (error) {
    console.error("Error syncing grade distribution:", error);
    throw error;
  }
}

// Run the function
async function main() {
  try {
    await syncGradeDistribution();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();