# CSA

Special Ed Alternate Assessment Data – Can be DISTRICT MANAGED

Rows: 0 · Primary key: ID, SQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → CSE.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| CO | varchar(2) |  |  | COD CSA.CO (8 codes) |
| MA | varchar(2) |  |  | COD CSA.MA (4 codes) |
| AR | varchar(2) |  |  | COD CSA.AR (6 codes) |
| CU | varchar(2) |  |  | COD CSA.CU (8 codes) |
| S1 | varchar(2) |  |  | COD CSA.S1 (6 codes) |
| S2 | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CSE**: CSA.ID = CSE.ID
- inferred → **STU**: CSA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
