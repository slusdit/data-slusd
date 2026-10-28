# PGR

Programming Screening

Rows: 7 · Primary key: ID, SQ · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | int |  |  |  |
| DT | datetime | yes |  |  |
| CD | nvarchar(3) |  |  |  |
| SCL | smallint |  |  |  |
| ST | nvarchar(3) |  |  |  |
| RS | nvarchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: PGR.ID = IDN.ID
- inferred → **STU**: PGR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
