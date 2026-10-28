# SFL

Student File Storage

Rows: 0 · Primary key: FID · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| FID | int |  |  |  |
| ID | int |  |  | FK → IDN.ID |
| GN | int |  |  |  |
| AN | int |  |  |  |
| NM | varchar(255) |  |  |  |
| SZ | int |  |  |  |
| TY | varchar(255) |  |  |  |
| UN | varchar(255) |  |  |  |
| DOC | varbinary(max) | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SFL.ID = IDN.ID
- inferred → **STU**: SFL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
