# GBU

Stores the information for students the teacher has allowed into the gradebook

Rows: 35,981 · Primary key: SC, GN, SN · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| GN | int |  |  | FK → GBK.GN |
| SN | int |  |  | FK → STU.SN |
| TG | nvarchar(1) |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| LN | nvarchar(50) |  |  |  |
| FN | nvarchar(20) |  |  |  |
| MN | nvarchar(20) |  |  |  |
| SX | nvarchar(1) |  |  |  |
| GR | smallint |  |  |  |
| BD | datetime | yes |  |  |
| ST | nvarchar(1) |  |  |  |
| LO | int |  |  |  |
| HI | int |  |  |  |
| TSC | money |  |  |  |
| CSC | money |  |  |  |
| CMK | nvarchar(3) |  |  |  |
| SRT | int |  |  |  |
| LID | nvarchar(10) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBK**: GBU.GN = GBK.GN
- declared FK → **STU**: GBU.SC = STU.SC AND GBU.SN = STU.SN
- inferred → **STU**: GBU.SC = STU.SC AND GBU.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: GBU.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **GBS**: GBS.SC = GBU.SC AND GBS.GN = GBU.GN AND GBS.SN = GBU.SN
- **GPS**: GPS.SC = GBU.SC AND GPS.GN = GBU.GN AND GPS.SN = GBU.SN
- **GTS**: GTS.SC = GBU.SC AND GTS.GN = GBU.GN AND GTS.SN = GBU.SN
