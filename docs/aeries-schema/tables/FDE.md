# FDE

Contains effects of the disabilities for 504 plans.

Rows: 1,559 · Primary key: ID, SQ, SQ1 · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → FOF.ID |
| SQ | smallint |  |  | FK → FOF.SQ |
| SQ1 | smallint |  |  |  |
| CD | varchar(6) |  |  | COD FDE.CD (48 codes) |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| UUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **FOF**: FDE.ID = FOF.ID AND FDE.SQ = FOF.SQ
- inferred → **STU**: FDE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
