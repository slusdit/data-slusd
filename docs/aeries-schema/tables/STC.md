# STC

Contains required information about the current credentials of staff members for State Reporting – Can be DISTRICT MANAGED

Rows: 490 · Primary key: ID, SQ · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → STF.ID |
| CD | varchar(4) |  |  | COD STC.CD (37 codes) |
| TY | varchar(2) |  |  | COD STC.TY (8 codes) |
| DT | datetime | yes |  |  |
| SQ | smallint |  |  |  |
| DN | varchar(20) |  |  |  |
| ED | datetime | yes |  |  |
| GL | nvarchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STF**: STC.ID = STF.ID
- inferred → **STU**: STC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
