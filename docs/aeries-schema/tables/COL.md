# COL

Names and Addresses of Colleges – Can be DISTRICT MANAGED.

Rows: 452 · Primary key: ID · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | smallint |  |  | → STU |
| NM | varchar(255) |  |  |  |
| AD | varchar(50) |  |  |  |
| CY | varchar(50) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(9) |  |  |  |
| TL | varchar(10) |  |  |  |
| CD | varchar(1) |  |  |  |
| ZX | varchar(4) |  |  |  |
| AT | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: COL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **CCC**: CCC.ID = COL.ID
- **CRT**: CRT.CN = COL.ID
