# FSI

Foster Student Information

Rows: 0 · Primary key: ID · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| FID | varchar(20) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| SSID | varchar(20) |  |  |  |
| PEL | bit |  |  |  |
| SRC | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FSI.ID = IDN.ID
- inferred → **STU**: FSI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
