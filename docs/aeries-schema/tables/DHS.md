# DHS


Rows: 0 · Primary key: ID, SQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → CSE.ID |
| SQ | smallint |  |  |  |
| DI | nvarchar(3) |  |  |  |
| DI2 | nvarchar(3) |  |  |  |
| DI3 | nvarchar(3) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CSE**: DHS.ID = CSE.ID
- inferred → **STU**: DHS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
