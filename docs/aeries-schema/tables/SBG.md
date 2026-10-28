# SBG

Elementary standards-based report card marks.

Aeries: Contains Grades given to Elementary Students

Rows: 240,083 · Primary key: SC, SN, SD, GR, MT, RC · Columns: 50

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| SD | varchar(20) |  |  | FK → STN.SD |
| GR | smallint |  |  |  |
| MT | varchar(2) |  |  |  |
| RC | varchar(3) |  |  |  |
| M1 | varchar(5) |  |  |  |
| M2 | varchar(5) |  |  |  |
| M3 | varchar(5) |  |  |  |
| M4 | varchar(5) |  |  |  |
| M5 | varchar(5) |  |  |  |
| M6 | varchar(5) |  |  |  |
| M7 | varchar(5) |  |  |  |
| M8 | varchar(5) |  |  |  |
| M9 | varchar(5) |  |  |  |
| M10 | varchar(5) |  |  |  |
| M11 | varchar(5) |  |  |  |
| M12 | varchar(5) |  |  |  |
| TN1 | smallint |  |  |  |
| TN2 | smallint |  |  |  |
| TN3 | smallint |  |  |  |
| TN4 | smallint |  |  |  |
| TN5 | smallint |  |  |  |
| TN6 | smallint |  |  |  |
| TN7 | smallint |  |  |  |
| TN8 | smallint |  |  |  |
| TN9 | smallint |  |  |  |
| TN10 | smallint |  |  |  |
| TN11 | smallint |  |  |  |
| TN12 | smallint |  |  |  |
| SH | smallint |  |  |  |
| LI | smallint |  |  |  |
| CO1 | nvarchar(max) |  |  |  |
| CO2 | nvarchar(max) |  |  |  |
| CO3 | nvarchar(max) |  |  |  |
| CO4 | nvarchar(max) |  |  |  |
| SE1 | smallint |  |  |  |
| SE2 | smallint |  |  |  |
| SE3 | smallint |  |  |  |
| SE4 | smallint |  |  |  |
| SE5 | smallint |  |  |  |
| SE6 | smallint |  |  |  |
| SE7 | smallint |  |  |  |
| SE8 | smallint |  |  |  |
| SE9 | smallint |  |  |  |
| SE10 | smallint |  |  |  |
| SE11 | smallint |  |  |  |
| SE12 | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STN**: SBG.SD = STN.SD
- declared FK → **STU**: SBG.SC = STU.SC AND SBG.SN = STU.SN
- inferred → **STU**: SBG.SC = STU.SC AND SBG.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: SBG.SC = LOC.CD (school code)
