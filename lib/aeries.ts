import "server-only";

import { randomUUID } from "crypto";
import type { SessionUser } from "@/auth";
import sql from "mssql";
import prisma from "./db";
import { queryCache } from "./queryCache";
import { requireUser } from "./authGuard";
import {
  AuthError,
  AuthzUser,
  resolveSchoolScope,
  userIsQueryEditor,
} from "./authorization";
import { getPoolForDatabase } from "./aeries-pool";
import { stripSqlComments, validateQueryWhitelist, validateSchoolCodes } from "./sql-guard";

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
  /**
   * Whether the staff record actually carries per-school access rows, as
   * opposed to `getSchools()` having fallen back to the primary school.
   */
  hasSchoolPermissions: boolean
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
import { DEFAULT_DB_YEAR, getDatabaseName } from "./schoolYear";

// Database used when no year is specified (legacy callers). The pool itself is
// created lazily by lib/aeries-pool.ts on first use (finding P10).
const defaultDatabase = process.env.DB_DATABASE || getDatabaseName(DEFAULT_DB_YEAR);

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
    pool = await getPoolForDatabase(defaultDatabase);
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


/** Hard cap on rows returned to the app from any report query (finding S13). */
export const MAX_ROWS = 10_000;

/**
 * Thrown when MSSQL rejects a query. `message` keeps the driver text
 * ("SQL error: ...") because the AI repair loop feeds it back to the model;
 * anything that reaches a browser must go through formatQueryErrorForUser().
 */
export class QueryExecutionError extends Error {
  readonly ref: string;
  readonly detail: string;

  constructor(detail: string, ref: string, cause?: unknown) {
    super(`SQL error: ${detail}`, { cause });
    this.name = "QueryExecutionError";
    this.ref = ref;
    this.detail = detail;
  }
}

/**
 * Message that is safe to send to a browser (finding S11). Query editors and
 * admins get the driver text (they wrote the SQL); everyone else gets a
 * correlation reference that matches the server log line.
 */
export function formatQueryErrorForUser(error: unknown, user: AuthzUser): string {
  const privileged = userIsQueryEditor(user);
  if (error instanceof QueryExecutionError) {
    return privileged
      ? `Query failed (ref ${error.ref}): ${error.detail}`
      : `Query failed (ref ${error.ref}). Please contact an administrator with this reference.`;
  }
  if (error instanceof AuthError) return error.message;
  if (privileged && error instanceof Error) return error.message;
  return "Query failed.";
}

export type QueryResult = {
  rows: any[];
  /** true when more than MAX_ROWS came back and the tail was dropped */
  truncated: boolean;
  /** rows returned by MSSQL before truncation */
  rowCount: number;
};

async function allSchoolCodes(): Promise<number[]> {
  const schools = await prisma.schoolInfo.findMany({ select: { sc: true } });
  return validateSchoolCodes(schools.map((s) => s.sc));
}

/**
 * Replace a scope placeholder with validated school codes. `= @@x` becomes
 * `in (...)` and a bare `@@x` becomes the list itself, so `sc IN (@@x)` also
 * works. An empty scope substitutes an impossible code so the query returns
 * no rows instead of running unscoped.
 */
function substituteSchoolPlaceholder(
  query: string,
  token: string,
  codes: number[],
  quoted: boolean
): string {
  const fmt = (c: number) => (quoted ? `'${c}'` : String(c));
  const list = (codes.length ? codes : [-1]).map(fmt).join(", ");
  return query
    .replace(new RegExp(`=\\s*${token}\\b`, "g"), `in (${list})`)
    .replace(new RegExp(`${token}\\b`, "g"), list);
}

/**
 * Resolve @@sc (every school the user may see), @@psc (primary school) and
 * @@asc (the school picker, intersected with the user's schools) from the
 * session, never from caller input (findings S2/S10).
 */
async function applyScopePlaceholders(query: string, user: SessionUser): Promise<string> {
  if (query.includes("@@sc")) {
    const scope = resolveSchoolScope({ ...user, activeSchool: 0 });
    const codes = scope === null ? await allSchoolCodes() : validateSchoolCodes(scope);
    query = substituteSchoolPlaceholder(query, "@@sc", codes, false);
  }

  if (query.includes("@@psc")) {
    const validatedPrimary = validateSchoolCodes(user.primarySchool);
    if (validatedPrimary.length === 0) {
      throw new Error("Invalid primary school code");
    }
    query = query.replace(/@@psc/g, `'${validatedPrimary[0]}'`);
  }

  if (query.includes("@@asc")) {
    const scope = resolveSchoolScope(user);
    const codes = scope === null ? await allSchoolCodes() : validateSchoolCodes(scope);
    query = substituteSchoolPlaceholder(query, "@@asc", codes, true);
  }

  return query;
}

function toExecutionError(error: unknown, context: string): QueryExecutionError {
  const ref = randomUUID().slice(0, 8);
  console.error(`[aeries] query failed ref=${ref} ${context}`, error);
  return new QueryExecutionError(error instanceof Error ? error.message : String(error), ref, error);
}

/**
 * Run a parameterized query (bound @params) as the signed-in user.
 * @param query - SQL query with parameter placeholders (@param1, @param2, etc.)
 * @param parameters - Object mapping parameter names to their values
 * @param options - Optional database year override
 * @throws AuthError when not signed in; QueryExecutionError on driver errors
 */
export async function runParameterizedQuery(
  query: string,
  parameters: Record<string, { type: any; value: any }> = {},
  options?: { dbYear?: number }
) {
  const user = await requireUser();
  validateQueryWhitelist(query);
  const cleanQuery = stripSqlComments(query);

  const dbYear = options?.dbYear ?? user.activeDbYear ?? DEFAULT_DB_YEAR;
  const database = getDatabaseName(dbYear);
  const pool = await getPoolForDatabase(database);
  const request = pool.request();
  for (const [name, param] of Object.entries(parameters)) {
    request.input(name, param.type, param.value);
  }

  try {
    const result = await request.query(cleanQuery);
    return result.recordset;
  } catch (error) {
    throw toExecutionError(error, `user=${user.email} db=${database} parameterized`);
  }
}

/**
 * Run saved-report SQL as the signed-in user: school placeholders are resolved
 * from the session and the result is capped at MAX_ROWS. Results are cached for
 * five minutes keyed on the scoped SQL and database year.
 * @throws AuthError when not signed in; QueryExecutionError on driver errors
 */
export async function runQueryWithMeta(
  query: string,
  options?: { dbYear?: number }
): Promise<QueryResult> {
  const user = await requireUser();
  validateQueryWhitelist(query);

  const dbYear = options?.dbYear ?? user.activeDbYear ?? DEFAULT_DB_YEAR;
  const scopedQuery = await applyScopePlaceholders(query, user);

  const cacheKey = { query: scopedQuery, dbYear };
  const cached = queryCache.get<QueryResult>(scopedQuery, cacheKey);
  if (cached) {
    return cached;
  }

  const database = getDatabaseName(dbYear);
  const pool = await getPoolForDatabase(database);
  let recordset: any[];
  try {
    const result = await pool.request().query(scopedQuery);
    recordset = result.recordset ?? [];
  } catch (error) {
    throw toExecutionError(error, `user=${user.email} db=${database}`);
  }

  const truncated = recordset.length > MAX_ROWS;
  const output: QueryResult = {
    rows: truncated ? recordset.slice(0, MAX_ROWS) : recordset,
    truncated,
    rowCount: recordset.length,
  };

  if (/^\s*(select|with)\b/i.test(scopedQuery)) {
    queryCache.set(scopedQuery, output, cacheKey, 300); // 5 minute TTL
  }
  return output;
}

/** Rows only (capped at MAX_ROWS). Use runQueryWithMeta to learn about truncation. */
export async function runQuery(query: string, options?: { dbYear?: number }): Promise<any[]> {
  return (await runQueryWithMeta(query, options)).rows;
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

/**
 * Resolves school access from the Aeries USR security table.
 *
 * Roughly two thirds of staff records carry no SchoolAccessPermissions rows, so
 * the staff API alone reports only their primary school. Their real access
 * lives in USR, where the same person can appear under up to three logins:
 * their email ("dmellons@slusd.us"), a bare username ("dmellons"), and a
 * network account suffixed with ".net" ("dmellons.net"). The ".net" account is
 * the elevated one, so it is used only when the person has no other login —
 * a regular account always wins.
 *
 * Logins are matched exactly, never with LIKE: the previous USR lookup used
 * `NM LIKE '<name>%'` and could pull in a different person's schools.
 *
 * @param {string} email - The staff member's email address.
 * @return {Promise<number[]>} School codes for the preferred login, or [] if
 * the person has no USR account at all.
 */
export async function getSchoolsFromUsrAccounts(email: string): Promise<number[]> {
  const localPart = email.split("@")[0]?.trim()
  if (!localPart) return []

  // Least-privileged first; the ".net" network account is the last resort.
  const loginsByPreference = [email, localPart, `${localPart}.net`]

  const rows = await runParameterizedQuery(
    `SELECT NM, SCH FROM USR WHERE DEL = 0 AND NM IN (@emailLogin, @bareLogin, @netLogin)`,
    {
      emailLogin: { type: sql.VarChar, value: email },
      bareLogin: { type: sql.VarChar, value: localPart },
      netLogin: { type: sql.VarChar, value: `${localPart}.net` },
    }
  )

  for (const login of loginsByPreference) {
    const schools = rows
      .filter((row: any) => String(row.NM ?? "").toLowerCase() === login.toLowerCase())
      .map((row: any) => Number(row.SCH))
      .filter((sc: number) => Number.isFinite(sc))
    if (schools.length > 0) return Array.from(new Set(schools))
  }

  return []
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
    `${process.env.AERIES_URL}${endpoint}`,
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
  // Aeries can return a 200 with an HTML error/login page (e.g. when the
  // AERIES-CERT key is invalid or AERIES_URL is wrong). Parsing
  // that as JSON throws a confusing "Unexpected token '<'" error, so detect
  // it and surface an actionable message instead.
  const body = await response.text();
  let data: PersonInfo[];
  try {
    data = JSON.parse(body);
  } catch {
    const preview = body.slice(0, 120).replace(/\s+/g, " ").trim();
    throw new Error(
      `Aeries staff endpoint ${endpoint} returned non-JSON (status 200). ` +
      `Check AERIES_URL and the AERIES-CERT key. Response began: ${preview}`
    );
  }
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
    "hasSchoolPermissions": (person.SchoolAccessPermissions?.length ?? 0) > 0,
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
    `${process.env.AERIES_URL}/api/v5/schools/${sc}/teachers`,
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