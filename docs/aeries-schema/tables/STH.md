# STH

Stores the Highly Qualified Status for particular NCLB Core Areas for each staff member

Rows: 1,347 · Primary key: ID, SQ · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → STF.ID |
| SQ | smallint |  |  |  |
| CA | varchar(2) |  |  |  |
| HQT | varchar(1) |  |  | COD STH.HQT (10 codes) |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STF**: STH.ID = STF.ID
- inferred → **STU**: STH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
