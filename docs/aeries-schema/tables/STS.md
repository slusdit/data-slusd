# STS

Stores State Test Settings.

Rows: 0 · Primary key: ID, SQ · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| CD | varchar(50) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: STS.ID = IDN.ID
- inferred → **STU**: STS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
