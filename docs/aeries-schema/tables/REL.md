# REL

Contains Religious information

Rows: 0 · Primary key: SC, SN · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| RLG | varchar(3) |  |  |  |
| WP | varchar(150) |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| D3 | datetime | yes |  |  |
| D4 | datetime | yes |  |  |
| D5 | datetime | yes |  |  |
| D6 | datetime | yes |  |  |
| U1 | varchar(3) |  |  |  |
| U2 | varchar(3) |  |  |  |
| U3 | varchar(3) |  |  |  |
| U4 | varchar(3) |  |  |  |
| U5 | varchar(3) |  |  |  |
| U6 | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: REL.SC = STU.SC AND REL.SN = STU.SN
- inferred → **STU**: REL.SC = STU.SC AND REL.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: REL.SC = LOC.CD (school code)
