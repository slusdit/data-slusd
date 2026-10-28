# AINV


Rows: 1,023 · Primary key: ID, SQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| ACID | int |  |  |  |
| ACDT | datetime | yes |  |  |
| ACSD | datetime | yes |  |  |
| ACAS | nvarchar(max) |  |  |  |
| ACTY | nvarchar(max) |  |  |  |
| ACST | nvarchar(max) |  |  |  |
| ACNT | nvarchar(max) |  |  |  |
| ACNA | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: AINV.ID = IDN.ID
- inferred → **STU**: AINV.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
