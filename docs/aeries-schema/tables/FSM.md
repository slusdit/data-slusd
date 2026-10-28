# FSM

Foster Meetings

Rows: 0 · Primary key: ID, RID · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RID | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| TY | varchar(2) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| AT | nvarchar(max) |  |  |  |
| ND | datetime | yes |  |  |
| LCN | nvarchar(255) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FSM.ID = IDN.ID
- inferred → **STU**: FSM.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
