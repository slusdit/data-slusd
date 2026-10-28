# ATL

Maintains a record of when changes are made to student attendance

Rows: 366,168 · Primary key: SC, SN, SQ · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → STU, LOC |
| SN | int |  |  | → STU |
| SQ | int |  |  |  |
| DT | datetime |  |  |  |
| FLD | varchar(255) |  |  |  |
| OD | varchar(255) |  |  |  |
| ND | varchar(255) |  |  |  |
| UNM | varchar(255) |  |  |  |
| IP | varchar(255) |  |  |  |
| SY | varchar(255) |  |  |  |
| DY | smallint |  |  |  |
| DTM | datetime | yes |  |  |
| SID | int |  |  |  |
| TID | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: ATL.SC = STU.SC AND ATL.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: ATL.SC = LOC.CD (school code)
