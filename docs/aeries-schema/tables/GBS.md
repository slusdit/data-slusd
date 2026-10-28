# GBS

Gradebook scores per student per assignment.

Aeries: Contains the scores received by students in a teacher's gradebook

Rows: 555,798 · Primary key: SC, SN, GN, AN · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → GBU.SC, STU.SC |
| SN | int |  |  | FK → GBU.SN, STU.SN |
| GN | int |  |  | FK → GBA.GN, GBU.GN |
| AN | int |  |  | FK → GBA.AN |
| DC | datetime | yes |  |  |
| SCR | money |  |  |  |
| MX | money |  |  |  |
| CO | nvarchar(max) |  |  |  |
| MK | nvarchar(20) |  |  |  |
| ST | nvarchar(2) |  |  | COD GBS.ST (8 codes) |
| DL | nvarchar(255) |  |  |  |
| NP | money |  |  |  |
| NC | money |  |  |  |
| PC | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBA**: GBS.GN = GBA.GN AND GBS.AN = GBA.AN
- declared FK → **GBU**: GBS.SC = GBU.SC AND GBS.GN = GBU.GN AND GBS.SN = GBU.SN
- declared FK → **STU**: GBS.SC = STU.SC AND GBS.SN = STU.SN
- inferred → **STU**: GBS.SC = STU.SC AND GBS.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: GBS.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **GBD**: GBD.SC = GBS.SC AND GBD.SN = GBS.SN AND GBD.GN = GBS.GN AND GBD.AN = GBS.AN
