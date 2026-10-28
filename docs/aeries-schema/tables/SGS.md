# SGS

Stores the Staff assigned to each Student Group

Rows: 67 · Primary key: ID, GI · Columns: 4

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → STF.ID |
| GI | int |  |  | FK → SGD.GI |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SGD**: SGS.GI = SGD.GI
- declared FK → **STF**: SGS.ID = STF.ID
- inferred → **STU**: SGS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
