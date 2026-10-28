# ADR

For recording Names and Addresses of Staff, Site Council, PTA, etc.

Rows: 44 · Primary key: SC, ID · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| ID | int |  |  | → STU |
| NM | varchar(40) |  |  |  |
| AD | varchar(40) |  |  |  |
| CY | varchar(30) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| ZX | varchar(4) |  |  |  |
| AC | varchar(3) |  |  |  |
| TL | varchar(7) |  |  |  |
| EX | varchar(4) |  |  |  |
| C1 | varchar(1) |  |  | COD ADR.C1 (4 codes) |
| C2 | varchar(1) |  |  | COD ADR.C2 (2 codes) |
| C3 | varchar(1) |  |  | COD ADR.C3 (2 codes) |
| C4 | varchar(1) |  |  |  |
| DT | datetime | yes |  |  |
| TG | varchar(50) |  |  |  |
| CL | varchar(10) |  |  |  |
| EM | varchar(100) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: ADR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: ADR.SC = LOC.CD (school code)
