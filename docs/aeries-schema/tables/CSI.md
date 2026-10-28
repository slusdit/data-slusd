# CSI

Special Ed Infant Services data – Can be DISTRICT MANAGED

Rows: 0 · Primary key: ID, SQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → CSE.ID |
| SQ | smallint |  |  |  |
| SV | varchar(2) |  |  | COD CSI.SV (27 codes) |
| AG | varchar(2) |  |  | COD CSI.AG (16 codes) |
| LO | varchar(3) |  |  | COD CSI.LO (7 codes) |
| FR | varchar(2) |  |  | COD CSI.FR (21 codes) |
| DU | varchar(4) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CSE**: CSI.ID = CSE.ID
- inferred → **STU**: CSI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
