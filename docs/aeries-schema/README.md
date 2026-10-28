# Aeries schema map

Generated 2026-10-28 from `DST26000SanLeandroUSD` by `scripts/generate-aeries-schema-map.ts` (`npm run generate:aeries-schema`). Structure only: no student records are read or written.

- 600 base tables (343 with rows), 146 views, 11,755 columns (331 with a meaning from curation, extended properties or view/report aliases).
- 465 declared foreign keys plus inferred joins from Aeries column conventions.
- 388 COD code sets and 24 absence codes.

## Files

- `tables.md` — every table with row count, key and description; links to one page per table.
- `tables/<TABLE>.md` — columns, types, meanings, code sets, declared and inferred joins, and which views / saved reports use the table.
- `joins.md` — conventions, every declared foreign key, every inferred join.
- `codes.md` — what coded values mean (COD and ABS).
- `schema.json` — the same content, machine-readable.
- `sources/curated.json` — hand-written table/column meanings and conventions. Edit this to improve the map, then regenerate.
- `sources/aeries-table-descriptions.txt` — official one-line table descriptions from Aeries Software.

## Conventions

- One SQL Server database per school year, named DST<yy>000SanLeandroUSD (yy = year the school year starts). The schema is identical across years; only the data differs.
- Nearly every table has DEL (bit, 1 = soft-deleted) and DTS (datetime, last change). Always filter DEL = 0.
- Student rows are keyed by SC + SN (school code + school-level student number). STU.ID is the district-wide Permanent ID and is the key for IDN, ENR and other cross-school tables.
- STU.TG is the status tag: blank = active, anything else = inactive (I), no-show (N), etc. Active-student queries use ISNULL(STU.TG,'') = ''.
- Coded columns are decoded through COD: COD.TC = table code, COD.FC = field code, COD.CD = value, COD.DE = description. COD.SC = 0 means district-wide.
- Absence codes live in ABS (per school), not COD. ATT.AL is the all-day code; ATT.A0..A9 are the period codes for periods 0-9.
- Aeries writes an ATT row only on days a student has at least one mark. Present days have no ATT row, so days enrolled must come from DAY x ENR (or AHS/YTD summaries), never from COUNT(ATT).
- School days = DAY rows where HO = '' (HO holds a holiday / non-school indicator). Term boundaries are in TRM (TM = '1'..'4', 'F', 'S', 'Y'; D1 = start, D2 = end).
- Sections: MST.SE is the section number; SEC links students (SC, SN) to sections (SE); CRS.CN is the course number; TCH.TN is the teacher number; STU.CU holds the counselor's TCH.TN.
- POP holds school options including the grade-posting windows (NM = 'GradeStartDate1'..'GradeEndDate12', OV = mm/dd/yyyy text). These are the windows teachers post marks, not the term dates.
- Grade marks: GRD.M1..M12 are the marks for grade reporting windows 1..12. In this district M2 is the Q1 mark at the secondary schools (window 1 is the progress report).

## How meanings are chosen

For each column, the first available of: curated meaning (`sources/curated.json`) → SQL Server extended property → the description of a view column that is sourced from it (`docs/llm-views-schema.md` + column lineage) → names the column is given in views, saved reports and AI fragments (shown as "aka …"). Columns with none of these are listed with type only; Aeries does not ship field descriptions inside the database.

## How to write a query against this database

1. Start from `tables.md` to pick tables, then open `tables/<TABLE>.md` for columns and joins. Use `joins.md` when two tables have no obvious key, and `codes.md` to decode a value.
2. Every table: filter `DEL = 0`. Students: `STU` with `ISNULL(STU.TG, '') = ''` for active students only. School code is `SC`; student number within the school is `SN`; district-wide Permanent ID is `ID`.
3. Decode a coded column with `LEFT JOIN COD ON COD.TC = 'STU' AND COD.FC = 'LF' AND COD.CD = STU.LF` and select `COD.DE`. Absence codes decode through `ABS` (per school), not COD.
4. Attendance: `ATT` has a row only on days with a mark. Count school days from `DAY` (`HO = ''`) within the `ENR` entry/leave dates, then subtract absences (`ABS.AD = 0`) from `ATT`.
5. Schedule chain: `STU` → `SEC` (SC, SN) → `MST` (SC, SE) → `CRS` (CN) and `TCH` (SC, TN). Current grades are `GRD` (SC, SN, SE); transcript history is `HIS`.
6. This app only runs a single `SELECT` / `WITH … SELECT` statement per report: no `DECLARE`, no semicolons between statements, no temp tables.

Example: active students at a school with their counselor and decoded language fluency.

```sql
SELECT stu.ID AS [Student ID], stu.LN, stu.FN, stu.GR, lf.DE AS LangFluency, tch.TE AS Counselor
FROM STU AS stu
LEFT JOIN COD AS lf ON lf.TC = 'STU' AND lf.FC = 'LF' AND lf.CD = stu.LF
LEFT JOIN TCH AS tch ON tch.SC = stu.SC AND tch.TN = stu.CU AND tch.DEL = 0
WHERE stu.SC = 16 AND stu.DEL = 0 AND ISNULL(stu.TG, '') = ''
```

## Core tables for reports

STU (students) · ENR (enrollment history) · ATT + ABS + DAY + TRM (attendance) · GRD + GRC + HIS (grades / transcript) · MST + SEC + CRS + TCH (schedule) · COD + LOC + POP (codes, schools, options) · PGM, CSE, LAC, FRE (programs) · ADS + DSP (discipline) · TST + CTL (tests) · CON (contacts).
