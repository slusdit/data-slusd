# CINV


Rows: 11,542 · Primary key: ID, SQ · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| DLG | datetime | yes |  |  |
| DVI | datetime | yes |  |  |
| CHC | varchar(100) |  |  |  |
| CHE | nvarchar(500) |  |  |  |
| INC | varchar(100) |  |  |  |
| INE | nvarchar(500) |  |  |  |
| NGR | int |  |  |  |
| RBY | varchar(150) |  |  |  |
| LEM | varchar(254) |  |  |  |
| IID | varchar(36) |  |  |  |
| TIR | smallint |  |  |  |
| OID | varchar(36) |  |  |  |
| VER | int |  |  |  |
| LVE | varchar(10) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: CINV.ID = IDN.ID
- inferred → **STU**: CINV.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
