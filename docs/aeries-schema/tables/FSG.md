# FSG

Foster Goals

Rows: 0 · Primary key: ID, RID, GID · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → FSA.ID |
| RID | varchar(255) |  |  | FK → FSA.RID |
| GID | varchar(255) |  |  |  |
| GL | nvarchar(max) |  |  |  |
| ACT | nvarchar(max) |  |  |  |
| RP | nvarchar(max) |  |  |  |
| TD | datetime | yes |  |  |
| ST | varchar(2) |  |  |  |
| CDT | datetime | yes |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **FSA**: FSG.ID = FSA.ID AND FSG.RID = FSA.RID
- inferred → **STU**: FSG.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
