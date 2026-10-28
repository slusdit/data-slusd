# FSS

Foster Team Contacts

Rows: 0 · Primary key: ID, RID · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RID | varchar(255) |  |  |  |
| NM | nvarchar(100) |  |  |  |
| RL | varchar(50) |  |  |  |
| EM | varchar(255) |  |  |  |
| TL | varchar(10) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FSS.ID = IDN.ID
- inferred → **STU**: FSS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
