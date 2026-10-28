# CAS

Class Attendance Submission Log for use with Flex Scheduling

Rows: 0 · Primary key: SC, SE, DT · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → MST, LOC |
| SE | smallint |  |  | → MST |
| DT | datetime |  |  |  |
| LT | datetime | yes |  |  |
| FT | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **MST**: CAS.SC = MST.SC AND CAS.SE = MST.SE (section number)
- inferred → **LOC**: CAS.SC = LOC.CD (school code)
