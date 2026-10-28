# CRUB


Rows: 23 · Primary key: ID, SQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| YEAR | varchar(9) |  |  | COD CRUB.YEAR (4 codes) |
| TERM | varchar(1) |  |  | COD CRUB.TERM (3 codes) |
| PREP | varchar(1) |  |  | COD CRUB.PREP (4 codes) |
| PART | varchar(1) |  |  | COD CRUB.PART (4 codes) |
| PERF | varchar(1) |  |  | COD CRUB.PERF (4 codes) |
| TPTS | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| STATUS | varchar(20) | yes |  |  |

## Joins

- declared FK → **IDN**: CRUB.ID = IDN.ID
- inferred → **STU**: CRUB.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
