# IVS

Internship Visits

Rows: 0 · Primary key: ID, SQ, SQ1 · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → ISP.ID |
| SQ | int |  |  | FK → ISP.SQ |
| SQ1 | int |  |  |  |
| DT | datetime | yes |  |  |
| TM | datetime | yes |  |  |
| CD | varchar(3) |  |  |  |
| CO | varchar(max) |  |  |  |
| SO | varchar(1) |  |  | COD IVS.SO (2 codes) |
| SNM | varchar(50) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ISP**: IVS.ID = ISP.ID AND IVS.SQ = ISP.SQ
- inferred → **STU**: IVS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
