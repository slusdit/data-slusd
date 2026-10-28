# RRI

Records Request Items

Rows: 0 · Primary key: ID, SQ, SQ1 · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → RRQ.ID |
| SQ | smallint |  |  | FK → RRQ.SQ |
| SQ1 | smallint |  |  |  |
| SCL | smallint |  |  |  |
| CD | nvarchar(6) |  |  | COD RRI.CD (9 codes) |
| CO | nvarchar(max) |  |  |  |
| RCD | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **RRQ**: RRI.ID = RRQ.ID AND RRI.SQ = RRQ.SQ
- inferred → **STU**: RRI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
