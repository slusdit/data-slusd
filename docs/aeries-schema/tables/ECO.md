# ECO

Special Ed Preschool Outcomes data - reported by TX districts for SPPI-7 dataset in the SPEDS summer submission.

Rows: 0 · Primary key: ID, SD · Columns: 20

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SD | datetime |  |  |  |
| ED | datetime | yes |  |  |
| ER | varchar(4) |  |  |  |
| SSR | varchar(4) |  |  |  |
| SER | varchar(4) |  |  |  |
| SNS | varchar(4) |  |  |  |
| KSR | varchar(4) |  |  |  |
| KER | varchar(4) |  |  |  |
| KNS | varchar(4) |  |  |  |
| FSR | varchar(4) |  |  |  |
| FER | varchar(4) |  |  |  |
| FNS | varchar(4) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ECO.ID = IDN.ID
- inferred → **STU**: ECO.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
