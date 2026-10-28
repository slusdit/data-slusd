# TAD

Stores Testing Administration settings.

Rows: 21 · Primary key: ID, TA · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | varchar(8) |  |  | → STU |
| TA | varchar(6) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: TAD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
