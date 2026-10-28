# GRH

History of grade reporting marks for earlier windows in the current year (snapshot per window).

Aeries: Contains previous Grade Reporting data given to Students in the current school year

Rows: 44,815 · Primary key: SC, SN, PD, CN, TN, SE, WM · Columns: 35

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → GRD.SC |
| SN | int |  |  | FK → GRD.SN |
| PD | smallint |  |  | FK → GRD.PD |
| CN | varchar(6) |  |  | FK → GRD.CN |
| TN | smallint |  |  | FK → GRD.TN |
| WM | smallint |  |  |  |
| MK | varchar(3) |  |  |  |
| CR | money |  |  |  |
| C1 | varchar(2) |  |  |  |
| C2 | varchar(2) |  |  |  |
| C3 | varchar(2) |  |  |  |
| CI | varchar(1) |  |  |  |
| WH | varchar(1) |  |  |  |
| AB | smallint |  |  |  |
| TD | smallint |  |  |  |
| SE | smallint |  |  | FK → GRD.SE |
| BL | smallint |  |  |  |
| EN | smallint |  |  |  |
| PR | smallint |  |  |  |
| EA | smallint |  |  |  |
| UA | smallint |  |  |  |
| SU | smallint |  |  |  |
| CO | nvarchar(max) |  |  |  |
| HR | money |  |  |  |
| TN2 | smallint |  |  |  |
| TN3 | smallint |  |  |  |
| ABG | varchar(1) |  |  |  |
| SID | int |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GRD**: GRH.SC = GRD.SC AND GRH.SN = GRD.SN AND GRH.PD = GRD.PD AND GRH.CN = GRD.CN AND GRH.TN = GRD.TN AND GRH.SE = GRD.SE
- inferred → **STU**: GRH.SC = STU.SC AND GRH.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: GRH.SC = MST.SC AND GRH.SE = MST.SE (section number)
- inferred → **CRS**: GRH.CN = CRS.CN (course number)
- inferred → **TCH**: GRH.SC = TCH.SC AND GRH.TN = TCH.TN (teacher number)
- inferred → **LOC**: GRH.SC = LOC.CD (school code)
