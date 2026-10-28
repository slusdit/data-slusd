# FPP

Contains the basic info of individuals who participate in the 504 plan.

Rows: 1,521 · Primary key: ID, SQ, SQ1 · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → FOF.ID |
| SQ | smallint |  |  | FK → FOF.SQ |
| SQ1 | smallint |  |  |  |
| TI | varchar(50) |  |  | COD FPP.TI (6 codes) |
| NM | varchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| UUI | int |  |  |  |
| PG | varchar(1) |  |  |  |
| AT | varchar(1) |  |  |  |
| RCT | varchar(6) |  |  |  |
| RCI | int |  |  |  |
| EM | varchar(255) |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **FOF**: FPP.ID = FOF.ID AND FPP.SQ = FOF.SQ
- inferred → **STU**: FPP.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
