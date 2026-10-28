# CSD

Special Ed Disability Services – Can be DISTRICT MANAGED

Rows: 0 · Primary key: ID, SQ · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → CSE.ID |
| SQ | smallint |  |  |  |
| CD | varchar(2) |  |  | COD CSD.CD (41 codes) |
| TN | smallint |  |  |  |
| DT | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CSE**: CSD.ID = CSE.ID
- inferred → **STU**: CSD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
