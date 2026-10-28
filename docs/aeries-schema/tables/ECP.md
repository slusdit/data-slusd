# ECP

Stores data to track Extracurricular Activity Probations

Rows: 0 · Primary key: ID, SQ · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| YR | varchar(9) |  |  |  |
| GR | smallint |  |  |  |
| SE | varchar(3) |  |  |  |
| CD | varchar(3) |  |  |  |
| SCL | smallint |  |  |  |
| CO | nvarchar(max) |  |  |  |
| ES | nvarchar(4) |  |  |  |
| DI | datetime | yes |  |  |
| RD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ECP.ID = IDN.ID
- inferred → **STU**: ECP.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
