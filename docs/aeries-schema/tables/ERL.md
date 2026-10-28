# ERL

Electronic Score Report Log

Rows: 375 · Primary key: ID, SQ · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| AY | nvarchar(4) |  |  |  |
| TT | nvarchar(25) |  |  |  |
| PE | bit |  |  |  |
| DE | datetime | yes |  |  |
| PN | bit |  |  |  |
| NC | nvarchar(max) |  |  |  |
| DN | datetime | yes |  |  |
| DF | datetime | yes |  |  |
| SRC | nvarchar(15) |  |  |  |
| PV | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ERL.ID = IDN.ID
- inferred → **STU**: ERL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
