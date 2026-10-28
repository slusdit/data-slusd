# PRN

Stores Meetings and Contacts for each Pre-Referral Intervention.

Rows: 93 · Primary key: ID, SQ, SQ1 · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → PRI.ID |
| SQ | smallint |  |  | FK → PRI.SQ |
| SQ1 | smallint |  |  |  |
| DT | datetime | yes |  |  |
| CD | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| BW | varchar(255) |  |  |  |
| PC | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **PRI**: PRN.ID = PRI.ID AND PRN.SQ = PRI.SQ
- inferred → **STU**: PRN.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
