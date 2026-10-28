# PAL


Rows: 0 · Primary key: SC, LG · Columns: 31

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → WEB.SC |
| LG | int |  |  |  |
| ID | varchar(30) |  |  | FK → WEB.ID |
| SN | int |  |  | → STU |
| LD | datetime |  |  |  |
| DY | smallint |  |  |  |
| DT | datetime | yes |  |  |
| OAL | varchar(1) |  |  |  |
| OA0 | varchar(1) |  |  |  |
| OA1 | varchar(1) |  |  |  |
| OA2 | varchar(1) |  |  |  |
| OA3 | varchar(1) |  |  |  |
| OA4 | varchar(1) |  |  |  |
| OA5 | varchar(1) |  |  |  |
| OA6 | varchar(1) |  |  |  |
| OA7 | varchar(1) |  |  |  |
| OA8 | varchar(1) |  |  |  |
| OA9 | varchar(1) |  |  |  |
| NAL | varchar(1) |  |  |  |
| NA0 | varchar(1) |  |  |  |
| NA1 | varchar(1) |  |  |  |
| NA2 | varchar(1) |  |  |  |
| NA3 | varchar(1) |  |  |  |
| NA4 | varchar(1) |  |  |  |
| NA5 | varchar(1) |  |  |  |
| NA6 | varchar(1) |  |  |  |
| NA7 | varchar(1) |  |  |  |
| NA8 | varchar(1) |  |  |  |
| NA9 | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **WEB**: PAL.SC = WEB.SC AND PAL.ID = WEB.ID
- inferred → **STU**: PAL.SC = STU.SC AND PAL.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: PAL.SC = LOC.CD (school code)
