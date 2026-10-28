# FSE

Foster Education Rights Holder

Rows: 0 · Primary key: ID, RID · Columns: 20

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RID | varchar(255) |  |  |  |
| HD | varchar(1) |  |  |  |
| NM | nvarchar(100) |  |  |  |
| AD | varchar(100) |  |  |  |
| CY | varchar(50) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(9) |  |  |  |
| TL | varchar(10) |  |  |  |
| EM | varchar(255) |  |  |  |
| RL | varchar(50) |  |  |  |
| LM | varchar(1) |  |  |  |
| SRC | varchar(50) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FSE.ID = IDN.ID
- inferred → **STU**: FSE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
