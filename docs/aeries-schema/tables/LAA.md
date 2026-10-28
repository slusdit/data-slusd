# LAA


Rows: 0 · Primary key: ID, SQ · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| TA | nvarchar(2) |  |  |  |
| RE | nvarchar(2) |  |  |  |
| DT | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: LAA.ID = IDN.ID
- inferred → **STU**: LAA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
