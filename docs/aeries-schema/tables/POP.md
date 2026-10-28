# POP

School-level options as name/value pairs, including grade-posting windows.

Aeries: Stores various options for the Teacher, Parent and Student Portals (also school-level grade reporting windows).

Rows: 20,724 · Primary key: SC, NM · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code | → LOC |
| NM | varchar(255) |  | Option name (e.g. GradeStartDate2) |  |
| OV | nvarchar(max) |  | Option value as text |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: POP.SC = LOC.CD (school code)

## Used in saved reports

"Grade Reporting Windows: Elementary", "Grade Reporting Windows: Secondary"
