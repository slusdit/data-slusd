# PHE

Contains data for export for CAHSEE Pre ID – Can be DISTRICT MANAGED

Rows: 0 · Primary key: SC, SN · Columns: 76

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| TP | varchar(1) |  |  |  |
| CD | varchar(7) |  |  |  |
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
| LU | varchar(10) |  |  |  |
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
| HL | varchar(2) |  |  |  |
| PE | varchar(2) |  |  |  |
| LF | varchar(4) |  |  |  |
| SM | varchar(2) |  |  |  |
| P1 | varchar(1) |  |  |  |
| P2 | varchar(1) |  |  |  |
| P3 | varchar(1) |  |  |  |
| P4 | varchar(1) |  |  |  |
| P5 | varchar(1) |  |  |  |
| NL | varchar(1) |  |  |  |
| PD | varchar(3) |  |  |  |
| ELE | datetime | yes |  |  |
| YRD | datetime | yes |  |  |
| RST | varchar(1) |  |  |  |
| LT | varchar(1) |  |  |  |
| AWC | varchar(1) |  |  |  |
| ERD | varchar(1) |  |  |  |
| ERS | varchar(1) |  |  |  |
| CID | varchar(10) |  |  |  |
| CP | varchar(37) |  |  |  |
| PG | varchar(40) |  |  |  |
| AD | varchar(30) |  |  |  |
| AD1 | varchar(30) |  |  |  |
| CY | varchar(30) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| ZX | varchar(4) |  |  |  |
| MTT | varchar(1) |  |  |  |
| ETT | varchar(1) |  |  |  |
| DCR | varchar(7) |  |  |  |
| DN | varchar(20) |  |  |  |
| NM | varchar(20) |  |  |  |
| ECA | varchar(1) |  |  |  |
| NPS | varchar(1) |  |  |  |
| NCD | varchar(7) |  |  |  |
| EDS | datetime | yes |  |  |
| CMU | varchar(1) |  |  |  |
| QTS | varchar(1) |  |  |  |
| QTD | varchar(1) |  |  |  |
| PGS | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: PHE.SC = STU.SC AND PHE.SN = STU.SN
- inferred → **STU**: PHE.SC = STU.SC AND PHE.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: PHE.SC = LOC.CD (school code)
