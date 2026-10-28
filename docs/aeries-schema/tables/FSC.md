# FSC

Foster Legal Cases

Rows: 0 · Primary key: ID, RID · Columns: 36

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RID | varchar(255) |  |  |  |
| CID | varchar(50) |  |  |  |
| AGC | varchar(255) |  |  |  |
| SVC | varchar(50) |  |  |  |
| CFN | nvarchar(100) |  |  |  |
| CLN | nvarchar(100) |  |  |  |
| CBD | datetime | yes |  |  |
| AGE | smallint |  |  |  |
| SX | varchar(1) |  |  |  |
| CC | varchar(1) |  |  |  |
| SWN | nvarchar(100) |  |  |  |
| SWP | varchar(10) |  |  |  |
| SWE | varchar(255) |  |  |  |
| RD | datetime | yes |  |  |
| PSD | datetime | yes |  |  |
| FNM | nvarchar(255) |  |  |  |
| FTY | varchar(255) |  |  |  |
| FAD | varchar(100) |  |  |  |
| FCY | varchar(50) |  |  |  |
| FCT | varchar(50) |  |  |  |
| FST | varchar(2) |  |  |  |
| FZC | varchar(9) |  |  |  |
| SRC | varchar(50) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| CSD | datetime | yes |  |  |
| OFC | varchar(255) |  |  |  |
| SS | varchar(100) |  |  |  |
| SSE | varchar(100) |  |  |  |
| SSP | varchar(10) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FSC.ID = IDN.ID
- inferred → **STU**: FSC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
