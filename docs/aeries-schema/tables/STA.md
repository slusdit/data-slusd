# STA

Contains required information about the current assignments of staff members for State Reporting – Can be DISTRICT MANAGED

Rows: 9 · Primary key: ID, SQ · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → STF.ID |
| CD | varchar(4) |  |  |  |
| PT | money |  |  |  |
| LI | varchar(2) |  |  |  |
| JC | varchar(2) |  |  | COD STA.JC (28 codes) |
| TF | varchar(1) |  |  |  |
| IEL | varchar(1) |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STF**: STA.ID = STF.ID
- inferred → **STU**: STA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
