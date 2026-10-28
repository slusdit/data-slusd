# ABS

Absence code definitions per school. Decodes ATT.AL and ATT.A0..A9.

Aeries: Codes used for recording absences

Rows: 580 · Primary key: SC, CD · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code | → LOC |
| CD | varchar(1) |  | Absence code (single character) | COD ABS.CD (18 codes) |
| TI | varchar(10) |  | Title / description |  |
| AB | varchar(3) |  | Short abbreviation |  |
| TY | smallint |  | Absence type number (verified / excused / unexcused / tardy groupings) |  |
| AD | bit |  | Counts as present for attendance-day purposes (1 = present, e.g. school business, in-school suspension, tardy) |  |
| LT | bit |  |  |  |
| DI | bit |  |  |  |
| OT | bit |  |  |  |
| GR | bit |  |  |  |
| SU | bit |  | Suspension code (1 = yes) |  |
| PT | bit |  | Partial-day / tardy-type flag |  |
| NE | bit |  |  |  |
| IS | varchar(1) |  |  |  |
| CC | nvarchar(6) |  |  |  |
| IPO | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: ABS.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **ATT**: ATT.SC = ABS.SC AND ATT.AL = ABS.CD

## Used in views

`MIISS_elementary_attendance`, `MIISS_secondary_attendance`, `SLUSD_elementary_daily_attendance`, `SLUSD_secondary_student_absences`, `SLUSD_secondary_student_all_day_absences`, `SLUSD_warm_body_elementary_absences`, `SLUSD_warm_body_elementary_totals`, `llm_attendance_daily`, `llm_attendance_summary`

## Used in saved reports

"Elementary Daily Attendance"
