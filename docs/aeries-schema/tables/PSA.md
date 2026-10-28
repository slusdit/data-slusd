# PSA

Contains data for export for SABE Pre ID – Can be DISTRICT MANAGED

Rows: 0 · Primary key: SC, SN · Columns: 63

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| TP | varchar(1) |  |  |  |
| DN | varchar(20) |  |  |  |
| CD | varchar(7) |  |  |  |
| SH | varchar(20) |  |  |  |
| CS | varchar(7) |  |  |  |
| GN | varchar(20) |  |  |  |
| GC | varchar(10) |  |  |  |
| GR | varchar(2) |  |  |  |
| LN | varchar(11) |  |  |  |
| FN | varchar(9) |  |  |  |
| MI | varchar(1) |  |  |  |
| ID | varchar(10) |  |  |  |
| BD | varchar(8) |  |  |  |
| SX | varchar(1) |  |  |  |
| EC | varchar(3) |  |  |  |
| M1 | varchar(1) |  |  |  |
| M2 | varchar(1) |  |  |  |
| M3 | varchar(1) |  |  |  |
| M4 | varchar(1) |  |  |  |
| M5 | varchar(1) |  |  |  |
| M6 | varchar(1) |  |  |  |
| M7 | varchar(1) |  |  |  |
| M8 | varchar(1) |  |  |  |
| M9 | varchar(1) |  |  |  |
| M10 | varchar(1) |  |  |  |
| M11 | varchar(1) |  |  |  |
| M12 | varchar(1) |  |  |  |
| M13 | varchar(1) |  |  |  |
| M14 | varchar(1) |  |  |  |
| M15 | varchar(1) |  |  |  |
| M16 | varchar(1) |  |  |  |
| M17 | varchar(1) |  |  |  |
| M18 | varchar(1) |  |  |  |
| NEL | varchar(1) |  |  |  |
| HL | varchar(2) |  |  |  |
| PE | varchar(2) |  |  |  |
| LF | varchar(1) |  |  |  |
| SM | varchar(2) |  |  |  |
| P1 | varchar(1) |  |  |  |
| P3 | varchar(1) |  |  |  |
| P4 | varchar(1) |  |  |  |
| P5 | varchar(1) |  |  |  |
| P6 | varchar(1) |  |  |  |
| P7 | varchar(1) |  |  |  |
| NL | varchar(1) |  |  |  |
| PD | varchar(3) |  |  |  |
| ELE | datetime | yes |  |  |
| EL | varchar(1) |  |  |  |
| LT | varchar(1) |  |  |  |
| ERD | varchar(1) |  |  |  |
| ERS | varchar(1) |  |  |  |
| CID | varchar(10) |  |  |  |
| ODC | varchar(7) |  |  |  |
| NPS | varchar(1) |  |  |  |
| NCD | varchar(7) |  |  |  |
| EDS | datetime | yes |  |  |
| LU | varchar(10) |  |  |  |
| QTS | varchar(1) |  |  |  |
| QTD | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: PSA.SC = STU.SC AND PSA.SN = STU.SN
- inferred → **STU**: PSA.SC = STU.SC AND PSA.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: PSA.SC = LOC.CD (school code)
