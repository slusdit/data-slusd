# HSG


Rows: 287,669 · Primary key: ID, GRT, CD · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| GRT | varchar(1) |  |  |  |
| CD | varchar(6) |  |  |  |
| RQ | money |  |  |  |
| CM | money |  |  |  |
| CU | money |  |  |  |
| PL | money |  |  |  |
| CUN | money |  |  |  |
| PLN | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: HSG.ID = IDN.ID
- inferred → **STU**: HSG.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
