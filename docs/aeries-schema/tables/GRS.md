# GRS

Contains Standards Based Grades given to Secondary Students

Rows: 0 · Primary key: SC, SN, PD, CN, TN, SE, SD · Columns: 38

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → GRD.SC |
| SN | int |  |  | FK → GRD.SN |
| PD | smallint |  |  | FK → GRD.PD |
| CN | varchar(6) |  |  | FK → GRD.CN |
| TN | smallint |  |  | FK → GRD.TN |
| SD | varchar(20) |  |  |  |
| M1 | varchar(4) |  |  |  |
| M2 | varchar(4) |  |  |  |
| M3 | varchar(4) |  |  |  |
| M4 | varchar(4) |  |  |  |
| M5 | varchar(4) |  |  |  |
| M6 | varchar(4) |  |  |  |
| M7 | varchar(4) |  |  |  |
| M8 | varchar(4) |  |  |  |
| M9 | varchar(4) |  |  |  |
| M10 | varchar(4) |  |  |  |
| M11 | varchar(4) |  |  |  |
| M12 | varchar(4) |  |  |  |
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
| SE | smallint |  |  | FK → GRD.SE |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GRD**: GRS.SC = GRD.SC AND GRS.SN = GRD.SN AND GRS.PD = GRD.PD AND GRS.CN = GRD.CN AND GRS.TN = GRD.TN AND GRS.SE = GRD.SE
- inferred → **STU**: GRS.SC = STU.SC AND GRS.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: GRS.SC = MST.SC AND GRS.SE = MST.SE (section number)
- inferred → **CRS**: GRS.CN = CRS.CN (course number)
- inferred → **TCH**: GRS.SC = TCH.SC AND GRS.TN = TCH.TN (teacher number)
- inferred → **LOC**: GRS.SC = LOC.CD (school code)
