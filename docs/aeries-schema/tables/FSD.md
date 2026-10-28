# FSD

Contains student disabilities for each 504 plan.

Rows: 549 · Primary key: ID, SQ, SQ1 · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → FOF.ID |
| SQ | smallint |  |  | FK → FOF.SQ |
| SQ1 | smallint |  |  |  |
| CD | varchar(6) |  |  | COD FSD.CD (21 codes) |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| UUI | int |  |  |  |
| CO | nvarchar(max) |  |  |  |
| FN | nvarchar(max) |  |  |  |
| SI | varchar(1) |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **FOF**: FSD.ID = FOF.ID AND FSD.SQ = FOF.SQ
- inferred → **STU**: FSD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
