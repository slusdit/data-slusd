# FST

Foster Summary Report Notes

Rows: 0 · Primary key: ID, RID · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RID | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| NT | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FST.ID = IDN.ID
- inferred → **STU**: FST.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
