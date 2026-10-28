# SGM

Stores the Students assigned to each Student Group

Rows: 21,466 · Primary key: ID, GI · Columns: 4

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| GI | int |  |  | FK → SGD.GI |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SGM.ID = IDN.ID
- declared FK → **SGD**: SGM.GI = SGD.GI
- inferred → **STU**: SGM.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
