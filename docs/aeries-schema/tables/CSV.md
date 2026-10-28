# CSV

Special Ed Student Services data – Can be DISTRICT MANAGED

Rows: 3,533 · Primary key: ID, SQ · Columns: 24

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → CSE.ID |
| CD | varchar(3) |  |  |  |
| PR | varchar(3) |  |  |  |
| LO | varchar(3) |  |  |  |
| FR | varchar(2) |  |  |  |
| DU | varchar(4) |  |  |  |
| TN | smallint |  |  |  |
| DT | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| SQ | smallint |  |  |  |
| NS | smallint |  |  |  |
| TY | varchar(2) |  |  | COD CSV.TY (5 codes) |
| SI | int |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DS | nvarchar(6) |  |  |  |
| MD | datetime | yes |  |  |
| A1 | nvarchar(max) |  |  |  |
| A2 | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CSE**: CSV.ID = CSE.ID
- inferred → **STU**: CSV.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
