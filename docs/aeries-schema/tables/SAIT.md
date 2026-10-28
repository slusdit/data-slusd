# SAIT


Rows: 465 · Primary key: ID, SQ · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| DAP | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SAIT.ID = IDN.ID
- inferred → **STU**: SAIT.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
