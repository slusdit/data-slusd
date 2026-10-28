# LKR

Contains information about all the lockers in the school

Rows: 5,074 · Primary key: SC, LK · Columns: 23

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → STU, MST, LOC |
| LK | varchar(6) |  |  |  |
| CM | varchar(6) |  |  |  |
| SN | int |  |  | → STU |
| C1 | varchar(6) |  |  |  |
| C2 | varchar(6) |  |  |  |
| C3 | varchar(6) |  |  |  |
| C4 | varchar(6) |  |  |  |
| C5 | varchar(6) |  |  |  |
| SE | varchar(10) |  |  | → MST |
| TG | varchar(1) |  |  | COD LKR.TG (1 codes) |
| LO | varchar(6) |  |  |  |
| PO | varchar(3) |  |  |  |
| U1 | varchar(3) |  |  |  |
| U2 | varchar(3) |  |  |  |
| U3 | varchar(3) |  |  |  |
| U4 | varchar(3) |  |  |  |
| U5 | varchar(3) |  |  |  |
| U6 | varchar(3) |  |  |  |
| U7 | varchar(3) |  |  |  |
| U8 | varchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: LKR.SC = STU.SC AND LKR.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: LKR.SC = MST.SC AND LKR.SE = MST.SE (section number)
- inferred → **LOC**: LKR.SC = LOC.CD (school code)
