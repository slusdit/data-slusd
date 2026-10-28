# FSH

Foster history

Rows: 0 · Primary key: ID, RID · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RID | varchar(255) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FSH.ID = IDN.ID
- inferred → **STU**: FSH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
