/**
 * Generates docs/aeries-schema/ — a map of every table in the Aeries MSSQL
 * database: columns and types, primary keys, declared and inferred joins,
 * coded columns (COD / ABS), and column meanings gathered from
 *
 *   1. docs/aeries-schema/sources/curated.json        (hand-written, highest priority)
 *   2. SQL Server extended properties (MS_Description)
 *   3. aliases used for the column in the database's views and in this app's
 *      saved reports / AI fragments (e.g. STU.LF appears as language_fluency_code)
 *   4. docs/aeries-schema/sources/aeries-table-descriptions.txt (official table list)
 *
 * Reads METADATA ONLY: INFORMATION_SCHEMA, sys.* catalog views, row counts,
 * the COD / ABS code definitions and the SQL text of views. No student rows.
 *
 *   npm run generate:aeries-schema
 *   npx tsx scripts/generate-aeries-schema-map.ts --dbYear=26
 */

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mssql from 'mssql';
import prisma from '../lib/db';
import { AVAILABLE_DB_YEARS, getDatabaseName } from '../lib/schoolYear';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../docs/aeries-schema');
const SOURCES_DIR = path.join(OUT_DIR, 'sources');

// ---------------------------------------------------------------- types

type Column = {
  name: string;
  type: string;
  nullable: boolean;
  ordinal: number;
  meaning?: string;
  meaningSource?: 'curated' | 'extended-property' | 'view-doc' | 'alias';
  aliases: string[];
  codeSet?: string; // "COD STU.LF (5 codes)" or "ABS (per school)"
  fkTo?: string[]; // "LOC.CD"
  inferred?: string[]; // "STU.SC,SN"
  source?: string; // view columns only: "STU.SX"
};

type Table = {
  name: string;
  kind: 'table' | 'view';
  rows: number | null;
  officialDescription?: string;
  curatedDescription?: string;
  extDescription?: string;
  pk: string[];
  columns: Column[];
  fksOut: Fk[];
  fksIn: Fk[];
  inferredJoins: InferredJoin[];
  referencedByViews: string[];
  referencedByReports: string[];
};

type Fk = { name: string; from: string; to: string; fromCols: string[]; toCols: string[] };
type InferredJoin = { to: string; on: string; note: string };
type CodeSet = { tc: string; fc: string; count: number; codes: { cd: string; de: string }[] };

type Curated = {
  conventions: string[];
  tables: Record<string, { description?: string; columns?: Record<string, string> }>;
};

// ---------------------------------------------------------------- helpers

function parseArgs() {
  const arg = process.argv.find((a) => a.startsWith('--dbYear='));
  return { dbYear: arg ? parseInt(arg.split('=')[1], 10) : AVAILABLE_DB_YEARS[0].year };
}

function readOfficialDescriptions(): Record<string, string> {
  const file = path.join(SOURCES_DIR, 'aeries-table-descriptions.txt');
  const out: Record<string, string> = {};
  if (!fs.existsSync(file)) return out;
  for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.match(/^([A-Z0-9_]+)\s+-\s+(.+)$/);
    if (m && !out[m[1]]) out[m[1]] = m[2].trim();
  }
  return out;
}

function readCurated(): Curated {
  const file = path.join(SOURCES_DIR, 'curated.json');
  if (!fs.existsSync(file)) return { conventions: [], tables: {} };
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { conventions: json.conventions ?? [], tables: json.tables ?? {} };
}

/** Column descriptions from docs/llm-views-schema.md: "### view" headings followed by | column | description | tables. */
function readViewDocs(): Map<string, string> {
  const file = path.resolve(__dirname, '../docs/llm-views-schema.md');
  const out = new Map<string, string>(); // "view.column" -> description
  if (!fs.existsSync(file)) return out;
  let view = '';
  for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const h = raw.match(/^###\s+(\S+)/);
    if (h) { view = h[1].trim(); continue; }
    const m = raw.match(/^\|\s*([A-Za-z_][A-Za-z0-9_]*)\s*\|\s*(.+?)\s*\|\s*$/);
    if (!view || !m || m[1].toLowerCase() === 'column' || /^-+$/.test(m[2])) continue;
    out.set(`${view}.${m[1]}`, m[2]);
  }
  return out;
}

function fmtType(r: {
  DATA_TYPE: string;
  CHARACTER_MAXIMUM_LENGTH: number | null;
  NUMERIC_PRECISION: number | null;
  NUMERIC_SCALE: number | null;
}): string {
  const t = r.DATA_TYPE;
  if (['varchar', 'nvarchar', 'char', 'nchar', 'varbinary', 'binary'].includes(t)) {
    return r.CHARACTER_MAXIMUM_LENGTH === -1 ? `${t}(max)` : `${t}(${r.CHARACTER_MAXIMUM_LENGTH})`;
  }
  if (['decimal', 'numeric'].includes(t)) return `${t}(${r.NUMERIC_PRECISION},${r.NUMERIC_SCALE})`;
  return t;
}

const SQL_KEYWORDS = new Set([
  'on', 'where', 'join', 'left', 'right', 'inner', 'outer', 'full', 'cross', 'apply', 'group', 'order', 'having',
  'union', 'select', 'from', 'as', 'and', 'or', 'not', 'in', 'is', 'null', 'case', 'when', 'then', 'else', 'end',
  'with', 'set', 'values', 'into', 'top', 'distinct', 'pivot', 'unpivot', 'for', 'over', 'partition', 'by', 'desc', 'asc',
]);

function stripComments(sql: string): string {
  return sql.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/--[^\n]*/g, ' ');
}

/**
 * Pull "table.column is called <alias>" hints out of a SQL text. Handles
 *   FROM STU [AS] stu ... stu.LF AS language_fluency_code
 *   stu.LF [Language Fluency]  /  stu.LF "Language Fluency"  /  stu.LF language_fluency,
 *   [dbo].[STU].[LF] AS x
 */
function extractAliasHints(sql: string, knownTables: Set<string>): Map<string, Map<string, number>> {
  const hints = new Map<string, Map<string, number>>(); // "STU.LF" -> alias -> count
  const text = stripComments(sql).replace(/\s+/g, ' ');

  // alias -> table
  const aliasToTable = new Map<string, string>();
  const refRe = /\b(?:from|join)\s+(?:\[?dbo\]?\.)?\[?([A-Za-z_][A-Za-z0-9_]*)\]?(?:\s+(?:as\s+)?\[?([A-Za-z_][A-Za-z0-9_]*)\]?)?/gi;
  let m: RegExpExecArray | null;
  while ((m = refRe.exec(text))) {
    const table = m[1].toUpperCase();
    if (!knownTables.has(table)) continue;
    aliasToTable.set(table.toLowerCase(), table);
    const alias = m[2];
    if (alias && !SQL_KEYWORDS.has(alias.toLowerCase())) aliasToTable.set(alias.toLowerCase(), table);
  }
  if (aliasToTable.size === 0) return hints;

  const colRe =
    /\[?([A-Za-z_][A-Za-z0-9_]*)\]?\.\[?([A-Za-z_][A-Za-z0-9_]*)\]?\s+(?:as\s+)?(?:\[([^\]]+)\]|"([^"]+)"|([A-Za-z_][A-Za-z0-9_]*))\s*(?=,|\bfrom\b)/gi;
  while ((m = colRe.exec(text))) {
    const table = aliasToTable.get(m[1].toLowerCase());
    if (!table) continue;
    const col = m[2].toUpperCase();
    const alias = (m[3] ?? m[4] ?? m[5] ?? '').trim();
    if (!alias || SQL_KEYWORDS.has(alias.toLowerCase())) continue;
    if (alias.toUpperCase() === col) continue; // "stu.LF AS LF" says nothing
    const key = `${table}.${col}`;
    const bucket = hints.get(key) ?? new Map<string, number>();
    bucket.set(alias, (bucket.get(alias) ?? 0) + 1);
    hints.set(key, bucket);
  }
  return hints;
}

function referencedTables(sql: string, knownTables: Set<string>): string[] {
  const text = stripComments(sql);
  const out = new Set<string>();
  const re = /\b(?:from|join)\s+(?:\[?dbo\]?\.)?\[?([A-Za-z_][A-Za-z0-9_]*)\]?/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const t = m[1].toUpperCase();
    if (knownTables.has(t)) out.add(t);
  }
  return [...out].sort();
}

function mdEscape(s: string | undefined | null): string {
  return (s ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
}

function fileNameFor(table: string): string {
  return table.replace(/[^A-Za-z0-9_.-]/g, '_') + '.md';
}

function n(v: number | null | undefined): string {
  return v == null ? '?' : v.toLocaleString('en-US');
}

// ---------------------------------------------------------------- main

async function main() {
  const { dbYear } = parseArgs();
  const database = getDatabaseName(dbYear);
  console.log(`Mapping ${database} ...`);

  const pool = await new mssql.ConnectionPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER!,
    database,
    options: { encrypt: true, trustServerCertificate: true },
    connectionTimeout: 30000,
    requestTimeout: 120000,
  }).connect();
  const q = async <T = any>(sql: string): Promise<T[]> => (await pool.request().query(sql)).recordset as T[];

  // ---- catalog metadata
  const tableRows = await q<{ TABLE_NAME: string; TABLE_TYPE: string }>(
    `SELECT TABLE_NAME, TABLE_TYPE FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' ORDER BY TABLE_NAME`
  );
  const columnRows = await q<{
    TABLE_NAME: string; COLUMN_NAME: string; DATA_TYPE: string; IS_NULLABLE: string; ORDINAL_POSITION: number;
    CHARACTER_MAXIMUM_LENGTH: number | null; NUMERIC_PRECISION: number | null; NUMERIC_SCALE: number | null;
  }>(
    `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE, ORDINAL_POSITION, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE
     FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo' ORDER BY TABLE_NAME, ORDINAL_POSITION`
  );
  const rowCounts = await q<{ name: string; rows: number }>(
    `SELECT t.name, SUM(p.rows) AS rows FROM sys.tables t JOIN sys.partitions p ON p.object_id = t.object_id AND p.index_id IN (0, 1) GROUP BY t.name`
  );
  const pkRows = await q<{ tbl: string; col: string; ord: number }>(
    `SELECT t.name AS tbl, c.name AS col, ic.key_ordinal AS ord
     FROM sys.indexes i JOIN sys.tables t ON t.object_id = i.object_id
     JOIN sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id
     JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
     WHERE i.is_primary_key = 1 ORDER BY t.name, ic.key_ordinal`
  );
  const fkRows = await q<{ name: string; child: string; parent: string; childCol: string; parentCol: string; ord: number }>(
    `SELECT fk.name, OBJECT_NAME(fk.parent_object_id) AS child, OBJECT_NAME(fk.referenced_object_id) AS parent,
            COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS childCol,
            COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS parentCol,
            fkc.constraint_column_id AS ord
     FROM sys.foreign_keys fk JOIN sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
     ORDER BY fk.name, fkc.constraint_column_id`
  );
  const extRows = await q<{ tbl: string; col: string | null; val: string }>(
    `SELECT OBJECT_NAME(ep.major_id) AS tbl, c.name AS col, CAST(ep.value AS nvarchar(4000)) AS val
     FROM sys.extended_properties ep LEFT JOIN sys.columns c ON c.object_id = ep.major_id AND c.column_id = ep.minor_id
     WHERE ep.class = 1 AND ep.name = 'MS_Description'`
  );
  // View definitions are not readable by the app's login (no VIEW DEFINITION permission), so
  // column lineage comes from sys.dm_exec_describe_first_result_set and table usage from
  // INFORMATION_SCHEMA.VIEW_COLUMN_USAGE instead of parsing SQL text.
  const viewNames = tableRows.filter((t) => t.TABLE_TYPE === 'VIEW').map((t) => t.TABLE_NAME);
  const viewLineage = new Map<string, { column: string; sourceTable: string | null; sourceColumn: string | null }[]>();
  for (const v of viewNames) {
    const quoted = `dbo.[${v.replace(/]/g, ']]')}]`;
    try {
      const rows = await q<{ name: string; source_table: string | null; source_column: string | null }>(
        `SELECT name, source_table, source_column FROM sys.dm_exec_describe_first_result_set(N'SELECT * FROM ${quoted.replace(/'/g, "''")}', NULL, 1)`
      );
      viewLineage.set(v, rows.map((r) => ({ column: r.name, sourceTable: r.source_table, sourceColumn: r.source_column })));
    } catch (e) {
      console.warn(`  lineage unavailable for view ${v}: ${(e as Error).message}`);
    }
  }
  const viewUsageRows = await q<{ VIEW_NAME: string; TABLE_NAME: string }>(
    `SELECT DISTINCT VIEW_NAME, TABLE_NAME FROM INFORMATION_SCHEMA.VIEW_COLUMN_USAGE WHERE TABLE_SCHEMA = 'dbo'`
  );
  // Code definitions (reference data that defines what coded columns mean)
  const codRows = await q<{ TC: string; FC: string; CD: string; DE: string }>(
    `SELECT TC, FC, CD, MAX(DE) AS DE FROM COD WHERE DEL = 0 GROUP BY TC, FC, CD ORDER BY TC, FC, CD`
  );
  const absRows = await q<{ CD: string; TI: string; AD: boolean; schools: number }>(
    `SELECT CD, MAX(TI) AS TI, MAX(CAST(AD AS int)) AS AD, COUNT(DISTINCT SC) AS schools FROM ABS WHERE DEL = 0 GROUP BY CD ORDER BY CD`
  );
  await pool.close();

  // ---- this app's saved SQL (names + SQL only, used for alias hints and "used in" lists)
  const savedQueries = await prisma.query.findMany({ select: { name: true, query: true } });
  const fragments = await prisma.aIFragment.findMany({ select: { fragmentId: true, snippet: true } });
  await prisma.$disconnect();

  // ---- assemble
  const official = readOfficialDescriptions();
  const curated = readCurated();
  const knownTables = new Set(tableRows.filter((t) => t.TABLE_TYPE === 'BASE TABLE').map((t) => t.TABLE_NAME.toUpperCase()));
  const rowCountMap = new Map(rowCounts.map((r) => [r.name, Number(r.rows)]));
  const extTable = new Map<string, string>();
  const extColumn = new Map<string, string>();
  for (const e of extRows) (e.col ? extColumn : extTable).set(e.col ? `${e.tbl}.${e.col}` : e.tbl, e.val);

  const codeSets = new Map<string, CodeSet>();
  for (const r of codRows) {
    const key = `${r.TC}.${r.FC}`;
    const set = codeSets.get(key) ?? { tc: r.TC, fc: r.FC, count: 0, codes: [] };
    set.count += 1;
    set.codes.push({ cd: r.CD, de: r.DE });
    codeSets.set(key, set);
  }

  // alias hints from views, saved reports and fragments
  const aliasHints = new Map<string, Map<string, number>>();
  const mergeHints = (h: Map<string, Map<string, number>>) => {
    for (const [k, bucket] of h) {
      const target = aliasHints.get(k) ?? new Map<string, number>();
      for (const [alias, c] of bucket) target.set(alias, (target.get(alias) ?? 0) + c);
      aliasHints.set(k, target);
    }
  };
  const viewUses = new Map<string, Set<string>>();
  const viewBuiltFrom = new Map<string, Set<string>>();
  for (const r of viewUsageRows) {
    const t = r.TABLE_NAME.toUpperCase();
    if (!knownTables.has(t)) continue;
    viewUses.set(t, (viewUses.get(t) ?? new Set()).add(r.VIEW_NAME));
    viewBuiltFrom.set(r.VIEW_NAME, (viewBuiltFrom.get(r.VIEW_NAME) ?? new Set()).add(t));
  }
  const viewDocs = readViewDocs();
  const viewDocMeaning = new Map<string, Map<string, number>>(); // "STU.LF" -> description -> count
  const viewColumnSource = new Map<string, string>(); // "view.column" -> "STU.SX"
  for (const [view, cols] of viewLineage) {
    for (const c of cols) {
      if (!c.sourceTable || !c.sourceColumn) continue;
      const t = c.sourceTable.toUpperCase();
      viewColumnSource.set(`${view}.${c.column}`, `${t}.${c.sourceColumn}`);
      const doc = viewDocs.get(`${view}.${c.column}`);
      if (doc) {
        const key = `${t}.${c.sourceColumn.toUpperCase()}`;
        const bucket = viewDocMeaning.get(key) ?? new Map<string, number>();
        bucket.set(doc, (bucket.get(doc) ?? 0) + 1);
        viewDocMeaning.set(key, bucket);
      }
      if (!knownTables.has(t)) continue;
      viewUses.set(t, (viewUses.get(t) ?? new Set()).add(view));
      viewBuiltFrom.set(view, (viewBuiltFrom.get(view) ?? new Set()).add(t));
      if (c.column.toUpperCase() === c.sourceColumn.toUpperCase()) continue;
      const key = `${t}.${c.sourceColumn.toUpperCase()}`;
      const bucket = aliasHints.get(key) ?? new Map<string, number>();
      bucket.set(c.column, (bucket.get(c.column) ?? 0) + 1);
      aliasHints.set(key, bucket);
    }
  }
  const reportUses = new Map<string, string[]>();
  for (const s of savedQueries) {
    mergeHints(extractAliasHints(s.query, knownTables));
    for (const t of referencedTables(s.query, knownTables)) reportUses.set(t, [...(reportUses.get(t) ?? []), s.name]);
  }
  for (const f of fragments) {
    if (!f.snippet) continue;
    mergeHints(extractAliasHints(f.snippet, knownTables));
  }

  const fks: Fk[] = [];
  {
    const byName = new Map<string, Fk>();
    for (const r of fkRows) {
      const fk = byName.get(r.name) ?? { name: r.name, from: r.child, to: r.parent, fromCols: [], toCols: [] };
      fk.fromCols.push(r.childCol);
      fk.toCols.push(r.parentCol);
      byName.set(r.name, fk);
    }
    fks.push(...byName.values());
  }

  const pkMap = new Map<string, string[]>();
  for (const r of pkRows) pkMap.set(r.tbl, [...(pkMap.get(r.tbl) ?? []), r.col]);

  const columnsByTable = new Map<string, Column[]>();
  for (const r of columnRows) {
    const list = columnsByTable.get(r.TABLE_NAME) ?? [];
    list.push({ name: r.COLUMN_NAME, type: fmtType(r), nullable: r.IS_NULLABLE === 'YES', ordinal: r.ORDINAL_POSITION, aliases: [] });
    columnsByTable.set(r.TABLE_NAME, list);
  }

  const tables: Table[] = [];
  for (const t of tableRows) {
    const name = t.TABLE_NAME;
    const kind: Table['kind'] = t.TABLE_TYPE === 'VIEW' ? 'view' : 'table';
    const cols = columnsByTable.get(name) ?? [];
    const colNames = new Set(cols.map((c) => c.name.toUpperCase()));
    const cur = curated.tables[name];

    for (const c of cols) {
      const key = `${name}.${c.name}`;
      const curatedMeaning = cur?.columns?.[c.name];
      const ext = extColumn.get(key);
      const bucket = aliasHints.get(`${name.toUpperCase()}.${c.name.toUpperCase()}`);
      if (bucket) c.aliases = [...bucket.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([a]) => a);
      const docBucket = viewDocMeaning.get(`${name.toUpperCase()}.${c.name.toUpperCase()}`);
      const docMeaning = docBucket ? [...docBucket.entries()].sort((a, b) => b[1] - a[1])[0][0] : undefined;
      const ownDoc = kind === 'view' ? viewDocs.get(`${name}.${c.name}`) : undefined;
      if (curatedMeaning) { c.meaning = curatedMeaning; c.meaningSource = 'curated'; }
      else if (ext) { c.meaning = ext; c.meaningSource = 'extended-property'; }
      else if (ownDoc) { c.meaning = ownDoc; c.meaningSource = 'view-doc'; }
      else if (docMeaning) { c.meaning = docMeaning; c.meaningSource = 'view-doc'; }
      else if (c.aliases.length) { c.meaning = c.aliases.join(', '); c.meaningSource = 'alias'; }

      if (kind === 'view') c.source = viewColumnSource.get(`${name}.${c.name}`);
      if (kind === 'table') {
        const set = codeSets.get(`${name}.${c.name}`);
        if (set) c.codeSet = `COD ${name}.${c.name} (${set.count} codes)`;
        if (name === 'ATT' && /^(AL|A[0-9])$/.test(c.name)) c.codeSet = 'ABS.CD (per school)';
      }
    }

    const inferred: InferredJoin[] = [];
    if (kind === 'table' && name !== 'STU') {
      if (colNames.has('SC') && colNames.has('SN')) inferred.push({ to: 'STU', on: `${name}.SC = STU.SC AND ${name}.SN = STU.SN`, note: 'student rows are keyed by school + student number' });
      else if (colNames.has('ID') && !['LOC', 'COD', 'CRS', 'CTL', 'STF'].includes(name) && name !== 'IDN') inferred.push({ to: 'STU', on: `${name}.ID = STU.ID`, note: 'Permanent-ID keyed table (verify: some tables use ID for other identifiers)' });
      if (colNames.has('SC') && colNames.has('SE') && name !== 'MST') inferred.push({ to: 'MST', on: `${name}.SC = MST.SC AND ${name}.SE = MST.SE`, note: 'section number' });
      if (colNames.has('CN') && name !== 'CRS') inferred.push({ to: 'CRS', on: `${name}.CN = CRS.CN`, note: 'course number' });
      if (colNames.has('SC') && colNames.has('TN') && name !== 'TCH') inferred.push({ to: 'TCH', on: `${name}.SC = TCH.SC AND ${name}.TN = TCH.TN`, note: 'teacher number' });
      if (colNames.has('SC') && name !== 'LOC') inferred.push({ to: 'LOC', on: `${name}.SC = LOC.CD`, note: 'school code' });
    }
    if (name === 'STU') {
      inferred.push({ to: 'LOC', on: 'STU.SC = LOC.CD', note: 'school code' });
      inferred.push({ to: 'TCH', on: 'STU.SC = TCH.SC AND STU.CU = TCH.TN', note: 'counselor' });
      inferred.push({ to: 'IDN', on: 'STU.ID = IDN.ID', note: 'permanent ID' });
    }
    for (const c of cols) {
      const matches = inferred.filter((j) => new RegExp(`\\b${name}\\.${c.name}\\b`).test(j.on));
      if (matches.length) c.inferred = matches.map((j) => j.to);
      const fkMatches = fks.filter((f) => f.from === name && f.fromCols.includes(c.name));
      if (fkMatches.length) c.fkTo = fkMatches.map((f) => `${f.to}.${f.toCols[f.fromCols.indexOf(c.name)]}`);
    }

    tables.push({
      name,
      kind,
      rows: kind === 'table' ? rowCountMap.get(name) ?? 0 : null,
      officialDescription: official[name.toUpperCase()],
      curatedDescription: cur?.description,
      extDescription: extTable.get(name),
      pk: pkMap.get(name) ?? [],
      columns: cols,
      fksOut: fks.filter((f) => f.from === name),
      fksIn: fks.filter((f) => f.to === name),
      inferredJoins: inferred,
      referencedByViews: [...(viewUses.get(name.toUpperCase()) ?? [])].sort(),
      referencedByReports: (reportUses.get(name.toUpperCase()) ?? []).sort(),
    });
  }

  // ---------------------------------------------------------------- write
  fs.rmSync(path.join(OUT_DIR, 'tables'), { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT_DIR, 'tables'), { recursive: true });
  const generatedAt = new Date().toISOString().slice(0, 10);
  const baseTables = tables.filter((t) => t.kind === 'table');
  const views = tables.filter((t) => t.kind === 'view');

  // schema.json
  fs.writeFileSync(
    path.join(OUT_DIR, 'schema.json'),
    JSON.stringify(
      {
        database,
        generatedAt,
        conventions: curated.conventions,
        tables: Object.fromEntries(
          tables.map((t) => [
            t.name,
            {
              kind: t.kind,
              rows: t.rows,
              description: t.curatedDescription ?? t.officialDescription ?? t.extDescription ?? null,
              officialDescription: t.officialDescription ?? null,
              pk: t.pk,
              columns: t.columns.map((c) => ({
                name: c.name, type: c.type, nullable: c.nullable, meaning: c.meaning ?? null, meaningSource: c.meaningSource ?? null,
                aliases: c.aliases, codeSet: c.codeSet ?? null, fkTo: c.fkTo ?? [], inferredJoin: c.inferred ?? [], source: c.source ?? null,
              })),
              foreignKeys: t.fksOut.map((f) => ({ to: f.to, on: f.fromCols.map((c, i) => `${c} = ${f.to}.${f.toCols[i]}`) })),
              inferredJoins: t.inferredJoins,
              usedInViews: t.referencedByViews,
              usedInReports: t.referencedByReports,
            },
          ])
        ),
        codeSets: Object.fromEntries([...codeSets.values()].map((s) => [`${s.tc}.${s.fc}`, s.codes])),
        absenceCodes: absRows.map((a) => ({ code: a.CD, title: a.TI, countsAsPresent: !!a.AD, schools: a.schools })),
      },
      null,
      1
    )
  );

  // per-table pages
  for (const t of tables) {
    const lines: string[] = [];
    lines.push(`# ${t.name}${t.kind === 'view' ? ' (view)' : ''}`);
    lines.push('');
    const desc = t.curatedDescription ?? t.officialDescription ?? t.extDescription;
    if (desc) lines.push(desc);
    if (t.curatedDescription && t.officialDescription && t.officialDescription !== t.curatedDescription) lines.push(`\nAeries: ${t.officialDescription}`);
    lines.push('');
    const meta: string[] = [];
    if (t.kind === 'table') meta.push(`Rows: ${n(t.rows)}`);
    meta.push(`Primary key: ${t.pk.length ? t.pk.join(', ') : '(none declared)'}`);
    meta.push(`Columns: ${t.columns.length}`);
    lines.push(meta.join(' · '));
    lines.push('');
    lines.push('## Columns');
    lines.push('');
    lines.push('| Column | Type | Null | Meaning | Values / joins |');
    lines.push('|---|---|---|---|---|');
    for (const c of t.columns) {
      const refs: string[] = [];
      if (c.source) refs.push(`from ${c.source}`);
      if (c.codeSet) refs.push(c.codeSet);
      if (c.fkTo?.length) refs.push(`FK → ${c.fkTo.join(', ')}`);
      if (c.inferred?.length && !c.fkTo?.length) refs.push(`→ ${c.inferred.join(', ')}`);
      const meaning = c.meaning ? (c.meaningSource === 'alias' ? `aka ${mdEscape(c.meaning)}` : mdEscape(c.meaning)) : '';
      lines.push(`| ${c.name} | ${c.type} | ${c.nullable ? 'yes' : ''} | ${meaning} | ${refs.join('; ')} |`);
    }
    lines.push('');
    if (t.fksOut.length || t.inferredJoins.length) {
      lines.push('## Joins');
      lines.push('');
      for (const f of t.fksOut) lines.push(`- declared FK → **${f.to}**: ${f.fromCols.map((c, i) => `${t.name}.${c} = ${f.to}.${f.toCols[i]}`).join(' AND ')}`);
      for (const j of t.inferredJoins) lines.push(`- inferred → **${j.to}**: ${j.on} (${j.note})`);
      lines.push('');
    }
    if (t.fksIn.length) {
      lines.push('## Referenced by (declared FKs)');
      lines.push('');
      for (const f of t.fksIn) lines.push(`- **${f.from}**: ${f.fromCols.map((c, i) => `${f.from}.${c} = ${t.name}.${f.toCols[i]}`).join(' AND ')}`);
      lines.push('');
    }
    if (t.referencedByViews.length) {
      lines.push('## Used in views');
      lines.push('');
      lines.push(t.referencedByViews.map((v) => `\`${v}\``).join(', '));
      lines.push('');
    }
    if (t.referencedByReports.length) {
      lines.push('## Used in saved reports');
      lines.push('');
      lines.push(t.referencedByReports.map((v) => `"${v}"`).join(', '));
      lines.push('');
    }
    fs.writeFileSync(path.join(OUT_DIR, 'tables', fileNameFor(t.name)), lines.join('\n'));
  }

  // tables.md index
  {
    const lines: string[] = [];
    lines.push(`# Aeries tables (${database}, generated ${generatedAt})`);
    lines.push('');
    lines.push(`${baseTables.length} base tables, ${views.length} views. Row counts are from the catalog (approximate). Empty tables are listed but unused in this district.`);
    lines.push('');
    lines.push('| Table | Rows | Key | Description |');
    lines.push('|---|---:|---|---|');
    for (const t of baseTables) {
      const desc = t.curatedDescription ?? t.officialDescription ?? t.extDescription ?? '';
      lines.push(`| [${t.name}](tables/${fileNameFor(t.name)}) | ${n(t.rows)} | ${t.pk.join(', ')} | ${mdEscape(desc)} |`);
    }
    lines.push('');
    lines.push('## Views');
    lines.push('');
    lines.push('| View | Columns | Built from |');
    lines.push('|---|---:|---|');
    for (const v of views) {
      lines.push(`| [${mdEscape(v.name)}](tables/${fileNameFor(v.name)}) | ${v.columns.length} | ${[...(viewBuiltFrom.get(v.name) ?? [])].sort().join(', ')} |`);
    }
    lines.push('');
    fs.writeFileSync(path.join(OUT_DIR, 'tables.md'), lines.join('\n'));
  }

  // joins.md
  {
    const lines: string[] = [];
    lines.push(`# Joins (generated ${generatedAt})`);
    lines.push('');
    lines.push('## Conventions');
    lines.push('');
    for (const c of curated.conventions) lines.push(`- ${c}`);
    lines.push('');
    lines.push('Published by Aeries (table-relations article): TCH.TN → STU.CU (counselor, one-to-many); STU → SEC on SN; SEC → MST on SE; TCH → ADS on TN; STU is not directly related to MST (go through SEC); TCH is not related to DAY.');
    lines.push('');
    lines.push(`## Declared foreign keys (${fks.length})`);
    lines.push('');
    lines.push('| From | To | On |');
    lines.push('|---|---|---|');
    for (const f of [...fks].sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to))) {
      lines.push(`| ${f.from} | ${f.to} | ${f.fromCols.map((c, i) => `${c} = ${f.to}.${f.toCols[i]}`).join(' AND ')} |`);
    }
    lines.push('');
    lines.push('## Inferred joins (by Aeries column conventions; verify before relying on them)');
    lines.push('');
    lines.push('| Table | Joins to | On |');
    lines.push('|---|---|---|');
    for (const t of baseTables) for (const j of t.inferredJoins) lines.push(`| ${t.name} | ${j.to} | ${j.on} |`);
    lines.push('');
    fs.writeFileSync(path.join(OUT_DIR, 'joins.md'), lines.join('\n'));
  }

  // codes.md
  {
    const lines: string[] = [];
    lines.push(`# Code definitions (generated ${generatedAt})`);
    lines.push('');
    lines.push('Values of coded columns, from the COD table (TC = table, FC = field) and the ABS absence-code table. Decode with `LEFT JOIN COD ON COD.TC = \'<table>\' AND COD.FC = \'<column>\' AND COD.CD = <table>.<column>`.');
    lines.push('');
    lines.push('## Absence codes (ABS, union across schools)');
    lines.push('');
    lines.push('| Code | Title | Counts as present (AD) | Schools defining it |');
    lines.push('|---|---|---|---:|');
    for (const a of absRows) lines.push(`| ${a.CD} | ${mdEscape(a.TI)} | ${a.AD ? 'yes' : 'no'} | ${a.schools} |`);
    lines.push('');
    lines.push('## COD code sets');
    lines.push('');
    const sets = [...codeSets.values()].sort((a, b) => a.tc.localeCompare(b.tc) || a.fc.localeCompare(b.fc));
    lines.push('| Table.Field | Codes | Values |');
    lines.push('|---|---:|---|');
    for (const s of sets) {
      const shown = s.codes.slice(0, 40).map((c) => `${c.cd} = ${mdEscape(c.de)}`).join('; ');
      lines.push(`| ${s.tc}.${s.fc} | ${s.count} | ${shown}${s.codes.length > 40 ? ' …' : ''} |`);
    }
    lines.push('');
    fs.writeFileSync(path.join(OUT_DIR, 'codes.md'), lines.join('\n'));
  }

  // README.md
  {
    const withMeaning = baseTables.reduce((acc, t) => acc + t.columns.filter((c) => c.meaning).length, 0);
    const totalCols = baseTables.reduce((acc, t) => acc + t.columns.length, 0);
    const lines: string[] = [];
    lines.push('# Aeries schema map');
    lines.push('');
    lines.push(`Generated ${generatedAt} from \`${database}\` by \`scripts/generate-aeries-schema-map.ts\` (\`npm run generate:aeries-schema\`). Structure only: no student records are read or written.`);
    lines.push('');
    lines.push(`- ${baseTables.length} base tables (${baseTables.filter((t) => (t.rows ?? 0) > 0).length} with rows), ${views.length} views, ${totalCols.toLocaleString('en-US')} columns (${withMeaning.toLocaleString('en-US')} with a meaning from curation, extended properties or view/report aliases).`);
    lines.push(`- ${fks.length} declared foreign keys plus inferred joins from Aeries column conventions.`);
    lines.push(`- ${codeSets.size} COD code sets and ${absRows.length} absence codes.`);
    lines.push('');
    lines.push('## Files');
    lines.push('');
    lines.push('- `tables.md` — every table with row count, key and description; links to one page per table.');
    lines.push('- `tables/<TABLE>.md` — columns, types, meanings, code sets, declared and inferred joins, and which views / saved reports use the table.');
    lines.push('- `joins.md` — conventions, every declared foreign key, every inferred join.');
    lines.push('- `codes.md` — what coded values mean (COD and ABS).');
    lines.push('- `schema.json` — the same content, machine-readable.');
    lines.push('- `sources/curated.json` — hand-written table/column meanings and conventions. Edit this to improve the map, then regenerate.');
    lines.push('- `sources/aeries-table-descriptions.txt` — official one-line table descriptions from Aeries Software.');
    lines.push('');
    lines.push('## Conventions');
    lines.push('');
    for (const c of curated.conventions) lines.push(`- ${c}`);
    lines.push('');
    lines.push('## How meanings are chosen');
    lines.push('');
    lines.push('For each column, the first available of: curated meaning (`sources/curated.json`) → SQL Server extended property → the description of a view column that is sourced from it (`docs/llm-views-schema.md` + column lineage) → names the column is given in views, saved reports and AI fragments (shown as "aka …"). Columns with none of these are listed with type only; Aeries does not ship field descriptions inside the database.');
    lines.push('');
    lines.push('## How to write a query against this database');
    lines.push('');
    lines.push('1. Start from `tables.md` to pick tables, then open `tables/<TABLE>.md` for columns and joins. Use `joins.md` when two tables have no obvious key, and `codes.md` to decode a value.');
    lines.push('2. Every table: filter `DEL = 0`. Students: `STU` with `ISNULL(STU.TG, \'\') = \'\'` for active students only. School code is `SC`; student number within the school is `SN`; district-wide Permanent ID is `ID`.');
    lines.push('3. Decode a coded column with `LEFT JOIN COD ON COD.TC = \'STU\' AND COD.FC = \'LF\' AND COD.CD = STU.LF` and select `COD.DE`. Absence codes decode through `ABS` (per school), not COD.');
    lines.push('4. Attendance: `ATT` has a row only on days with a mark. Count school days from `DAY` (`HO = \'\'`) within the `ENR` entry/leave dates, then subtract absences (`ABS.AD = 0`) from `ATT`.');
    lines.push('5. Schedule chain: `STU` → `SEC` (SC, SN) → `MST` (SC, SE) → `CRS` (CN) and `TCH` (SC, TN). Current grades are `GRD` (SC, SN, SE); transcript history is `HIS`.');
    lines.push('6. This app only runs a single `SELECT` / `WITH … SELECT` statement per report: no `DECLARE`, no semicolons between statements, no temp tables.');
    lines.push('');
    lines.push('Example: active students at a school with their counselor and decoded language fluency.');
    lines.push('');
    lines.push('```sql');
    lines.push('SELECT stu.ID AS [Student ID], stu.LN, stu.FN, stu.GR, lf.DE AS LangFluency, tch.TE AS Counselor');
    lines.push('FROM STU AS stu');
    lines.push('LEFT JOIN COD AS lf ON lf.TC = \'STU\' AND lf.FC = \'LF\' AND lf.CD = stu.LF');
    lines.push('LEFT JOIN TCH AS tch ON tch.SC = stu.SC AND tch.TN = stu.CU AND tch.DEL = 0');
    lines.push('WHERE stu.SC = 16 AND stu.DEL = 0 AND ISNULL(stu.TG, \'\') = \'\'');
    lines.push('```');
    lines.push('');
    lines.push('## Core tables for reports');
    lines.push('');
    lines.push('STU (students) · ENR (enrollment history) · ATT + ABS + DAY + TRM (attendance) · GRD + GRC + HIS (grades / transcript) · MST + SEC + CRS + TCH (schedule) · COD + LOC + POP (codes, schools, options) · PGM, CSE, LAC, FRE (programs) · ADS + DSP (discipline) · TST + CTL (tests) · CON (contacts).');
    lines.push('');
    fs.writeFileSync(path.join(OUT_DIR, 'README.md'), lines.join('\n'));
  }

  console.log(`Wrote ${tables.length} table pages, tables.md, joins.md, codes.md, schema.json, README.md to ${path.relative(process.cwd(), OUT_DIR)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
