# GTN

Stores various notes about a GATE Referral.

Rows: 0 · Primary key: ID, RSQ, SQ · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → GTR.ID |
| RSQ | smallint |  |  | FK → GTR.SQ |
| SQ | smallint |  |  |  |
| ENM | varchar(255) |  |  |  |
| ETY | varchar(2) |  |  |  |
| FDT | datetime | yes |  |  |
| DT | datetime | yes |  |  |
| TY | varchar(2) |  |  |  |
| LO | varchar(255) |  |  |  |
| RDT | datetime | yes |  |  |
| RC | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GTR**: GTN.ID = GTR.ID AND GTN.RSQ = GTR.SQ
- inferred → **STU**: GTN.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
