# ATN

For recording specific details for a particular student and date.

Rows: 47,902 · Primary key: SC, SN, SQ · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| PD | smallint |  |  |  |
| CD | varchar(3) |  |  | COD ATN.CD (3 codes) |
| CO | nvarchar(max) |  |  |  |
| NM | varchar(255) |  |  |  |
| RDT | datetime | yes |  |  |
| TM | datetime | yes |  |  |
| AU | varchar(255) |  |  |  |
| SE | smallint |  |  | → MST |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: ATN.SC = STU.SC AND ATN.SN = STU.SN
- inferred → **STU**: ATN.SC = STU.SC AND ATN.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: ATN.SC = MST.SC AND ATN.SE = MST.SE (section number)
- inferred → **LOC**: ATN.SC = LOC.CD (school code)
