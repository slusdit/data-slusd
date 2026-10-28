# LAV


Rows: 0 · Primary key: ID, SQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| SV | nvarchar(2) |  |  |  |
| FR | nvarchar(2) |  |  |  |
| HR | nvarchar(2) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: LAV.ID = IDN.ID
- inferred → **STU**: LAV.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
