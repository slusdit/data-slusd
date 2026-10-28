# FSA

Foster Action Plans

Rows: 0 · Primary key: ID, RID · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RID | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| DE | nvarchar(max) |  |  |  |
| TD | datetime | yes |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FSA.ID = IDN.ID
- inferred → **STU**: FSA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **FSG**: FSG.ID = FSA.ID AND FSG.RID = FSA.RID
