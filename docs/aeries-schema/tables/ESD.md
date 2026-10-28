# ESD


Rows: 0 · Primary key: ID, TY, CD · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| TY | varchar(1) |  |  |  |
| CD | varchar(1) |  |  |  |
| ED | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: ESD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
