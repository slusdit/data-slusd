# GPS


Rows: 0 · Primary key: SC, SN, GN, GP · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → GBU.SC, GPD.SC |
| SN | int |  |  | FK → GBU.SN |
| GN | int |  |  | FK → GBU.GN |
| GP | nvarchar(10) |  |  | FK → GPD.GP |
| MK | nvarchar(3) |  |  |  |
| PC | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBU**: GPS.SC = GBU.SC AND GPS.GN = GBU.GN AND GPS.SN = GBU.SN
- declared FK → **GPD**: GPS.SC = GPD.SC AND GPS.GP = GPD.GP
- inferred → **STU**: GPS.SC = STU.SC AND GPS.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: GPS.SC = LOC.CD (school code)
