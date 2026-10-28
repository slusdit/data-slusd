# FSL

Foster Attorneys

Rows: 0 · Primary key: ID, RID · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RID | varchar(255) |  |  |  |
| BN | nvarchar(255) |  |  |  |
| FN | nvarchar(100) |  |  |  |
| LN | nvarchar(100) |  |  |  |
| EM | varchar(255) |  |  |  |
| TL | varchar(10) |  |  |  |
| SRC | varchar(50) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FSL.ID = IDN.ID
- inferred → **STU**: FSL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
