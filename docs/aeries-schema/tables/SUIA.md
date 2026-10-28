# SUIA


Rows: 6 · Primary key: ID, SQ · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| ADSQ | smallint |  |  |  |
| INV | varchar(50) |  |  | COD SUIA.INV (3 codes) |
| SD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SUIA.ID = IDN.ID
- inferred → **STU**: SUIA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
