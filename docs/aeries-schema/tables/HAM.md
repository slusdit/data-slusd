# HAM


Rows: 0 · Primary key: ID, SQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| TY | nvarchar(2) |  |  |  |
| AC | nvarchar(2) |  |  |  |
| AD | nvarchar(2) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: HAM.ID = IDN.ID
- inferred → **STU**: HAM.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
