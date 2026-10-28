# GTS

Stores the default grade that a student earned from the previous teacher.

Rows: 9 · Primary key: SC, SN, GN, CA, TY · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → GBU.SC |
| SN | int |  |  | FK → GBU.SN |
| GN | int |  |  | FK → GBU.GN |
| CA | nvarchar(1) |  |  |  |
| TY | varchar(255) |  |  |  |
| TSC | money |  |  |  |
| TMK | nvarchar(20) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBU**: GTS.SC = GBU.SC AND GTS.GN = GBU.GN AND GTS.SN = GBU.SN
- inferred → **STU**: GTS.SC = STU.SC AND GTS.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: GTS.SC = LOC.CD (school code)
