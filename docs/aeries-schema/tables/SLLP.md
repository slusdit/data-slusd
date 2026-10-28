# SLLP


Rows: 5,050 · Primary key: ID, SQ · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| LP | varchar(100) |  |  |  |
| AC | varchar(50) |  |  |  |
| URL | varchar(100) |  |  |  |
| SD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SLLP.ID = IDN.ID
- inferred → **STU**: SLLP.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
