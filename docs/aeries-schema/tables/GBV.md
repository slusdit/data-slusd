# GBV

Stores student overall grade by term.

Rows: 56,988 · Primary key: SC, SN, GN, CD · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| GN | int |  |  | FK → GBR.GN |
| CD | varchar(1) |  |  | FK → GBR.CD |
| MK | nvarchar(3) |  |  |  |
| PC | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBR**: GBV.GN = GBR.GN AND GBV.CD = GBR.CD
- declared FK → **STU**: GBV.SC = STU.SC AND GBV.SN = STU.SN
- inferred → **STU**: GBV.SC = STU.SC AND GBV.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: GBV.SC = LOC.CD (school code)
