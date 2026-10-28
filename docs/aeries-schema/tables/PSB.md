# PSB

Contains data for export for Smarter Balanced Pre ID - Can be DISTRICT MANAGED.

Rows: 0 · Primary key: SC, SN · Columns: 25

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| ID | int |  |  |  |
| ST | varchar(2) |  |  |  |
| CD | varchar(7) |  |  |  |
| CS | varchar(7) |  |  |  |
| LN | varchar(50) |  |  |  |
| FN | varchar(50) |  |  |  |
| MN | varchar(50) |  |  |  |
| BD | varchar(8) |  |  |  |
| CID | varchar(10) |  |  |  |
| GR | varchar(2) |  |  |  |
| SX | varchar(1) |  |  |  |
| EC | varchar(1) |  |  |  |
| M1 | varchar(1) |  |  |  |
| M2 | varchar(1) |  |  |  |
| M3 | varchar(1) |  |  |  |
| M4 | varchar(1) |  |  |  |
| M5 | varchar(1) |  |  |  |
| SE | varchar(1) |  |  | → MST |
| EL | varchar(1) |  |  |  |
| P1 | varchar(1) |  |  |  |
| P2 | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: PSB.SC = STU.SC AND PSB.SN = STU.SN
- inferred → **STU**: PSB.SC = STU.SC AND PSB.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: PSB.SC = MST.SC AND PSB.SE = MST.SE (section number)
- inferred → **LOC**: PSB.SC = LOC.CD (school code)
