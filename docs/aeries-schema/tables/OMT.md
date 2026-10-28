# OMT

Stores additional medical tests, including COVID-19 tests.

Rows: 0 · Primary key: ID, SQ · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| TY | nvarchar(6) |  |  |  |
| RS | nvarchar(6) |  |  |  |
| DT | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: OMT.ID = IDN.ID
- inferred → **STU**: OMT.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
