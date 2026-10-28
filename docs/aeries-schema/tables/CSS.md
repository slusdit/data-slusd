# CSS

Special Ed Student Suspensions – Can be DISTRICT MANAGED

Rows: 0 · Primary key: ID, SQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → CSE.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| CD | varchar(2) |  |  |  |
| DY | smallint |  |  |  |
| R1 | varchar(2) |  |  | COD CSS.R1 (27 codes) |
| R2 | varchar(2) |  |  |  |
| R3 | varchar(2) |  |  |  |
| DS | varchar(2) |  |  | COD CSS.DS (17 codes) |
| DP | varchar(2) |  |  | COD CSS.DP (4 codes) |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CSE**: CSS.ID = CSE.ID
- inferred → **STU**: CSS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Used in views

`SEIS_Discipline`
