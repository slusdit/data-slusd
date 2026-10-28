# FSR

Foster Hearings

Rows: 0 · Primary key: ID, RID · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RID | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| DN | varchar(50) |  |  |  |
| TY | varchar(100) |  |  |  |
| SRC | varchar(50) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FSR.ID = IDN.ID
- inferred → **STU**: FSR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
