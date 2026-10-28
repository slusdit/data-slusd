# FEC

Contains evaluation criteria for each 504 plan.

Rows: 625 · Primary key: ID, SQ, SQ1 · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → FOF.ID |
| SQ | smallint |  |  | FK → FOF.SQ |
| SQ1 | smallint |  |  |  |
| CD | nvarchar(6) |  |  | COD FEC.CD (21 codes) |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| UUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **FOF**: FEC.ID = FOF.ID AND FEC.SQ = FOF.SQ
- inferred → **STU**: FEC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
