# PRR

Stores Reasons and Concerns for each Pre-Referral Intervention.

Rows: 26 · Primary key: ID, SQ, SQ1 · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → PRI.ID |
| SQ | smallint |  |  | FK → PRI.SQ |
| SQ1 | smallint |  |  |  |
| CD | varchar(3) |  |  | COD PRR.CD (3 codes) |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **PRI**: PRR.ID = PRI.ID AND PRR.SQ = PRI.SQ
- inferred → **STU**: PRR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
