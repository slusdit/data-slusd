# GTC

Stores student characteristics that triggered a particular GATE Referral.

Rows: 0 · Primary key: ID, RSQ, SQ · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → GTR.ID |
| RSQ | smallint |  |  | FK → GTR.SQ |
| SQ | smallint |  |  |  |
| TY | varchar(2) |  |  |  |
| CD | varchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GTR**: GTC.ID = GTR.ID AND GTC.RSQ = GTR.SQ
- inferred → **STU**: GTC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
