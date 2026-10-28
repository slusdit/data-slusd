# MLI


Rows: 0 · Primary key: ID · Columns: 25

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → MLS.ID |
| DT | date | yes |  |  |
| CH1 | nvarchar(3) |  |  |  |
| CH2 | nvarchar(3) |  |  |  |
| CH3 | nvarchar(3) |  |  |  |
| CH4 | nvarchar(3) |  |  |  |
| CH5 | nvarchar(3) |  |  |  |
| FL1 | nvarchar(3) |  |  |  |
| FL2 | nvarchar(3) |  |  |  |
| FL3 | nvarchar(3) |  |  |  |
| FL4 | nvarchar(3) |  |  |  |
| FL5 | nvarchar(3) |  |  |  |
| ML | nvarchar(3) |  |  |  |
| PWC | nvarchar(3) |  |  |  |
| POC | nvarchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **MLS**: MLI.ID = MLS.ID
- inferred → **STU**: MLI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
