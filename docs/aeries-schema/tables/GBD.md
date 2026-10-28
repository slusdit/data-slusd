# GBD

Stores the gradebook scores by standard for each assignment

Rows: 340 · Primary key: SC, SN, GN, AN, SD · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → GBS.SC |
| SN | int |  |  | FK → GBS.SN |
| GN | int |  |  | FK → GBS.GN |
| AN | int |  |  | FK → GBS.AN |
| SD | varchar(20) |  |  |  |
| SCR | money |  |  |  |
| MX | money |  |  |  |
| MK | nvarchar(20) |  |  |  |
| NC | money |  |  |  |
| NP | money |  |  |  |
| PC | money |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBS**: GBD.SC = GBS.SC AND GBD.SN = GBS.SN AND GBD.GN = GBS.GN AND GBD.AN = GBS.AN
- inferred → **STU**: GBD.SC = STU.SC AND GBD.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: GBD.SC = LOC.CD (school code)
