# GES

Stores Student Endorsement Statuses

Rows: 0 · Primary key: ID, EC · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| EC | nvarchar(6) |  |  |  |
| OI | bit |  |  |  |
| ST | varchar(20) |  |  |  |
| MO | bit |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| DC | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: GES.ID = IDN.ID
- inferred → **STU**: GES.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
