# PRC

Stores Pre-Referral Intervention Codes.

Rows: 17 · Primary key: ID, SQ, SQ1 · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → PRI.ID |
| SQ | smallint |  |  | FK → PRI.SQ |
| SQ1 | smallint |  |  |  |
| CD | varchar(3) |  |  | COD PRC.CD (3 codes) |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **PRI**: PRC.ID = PRI.ID AND PRC.SQ = PRI.SQ
- inferred → **STU**: PRC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
