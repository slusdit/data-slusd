# IMB

Stores student immunizations boosters (COVID-19)

Rows: 165 · Primary key: ID, SQ · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| TY | nvarchar(6) |  |  |  |
| ST | nvarchar(6) |  |  |  |
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

- declared FK → **IDN**: IMB.ID = IDN.ID
- inferred → **STU**: IMB.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
