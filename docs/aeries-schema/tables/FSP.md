# FSP

Foster Placements

Rows: 0 · Primary key: ID, RID · Columns: 24

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RID | varchar(255) |  |  |  |
| ED | datetime | yes |  |  |
| FTY | varchar(255) |  |  |  |
| SRC | varchar(50) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| SD | datetime | yes |  |  |
| CP | bit |  |  |  |
| AD | varchar(100) |  |  |  |
| CY | varchar(50) |  |  |  |
| ST | varchar(50) |  |  |  |
| ZC | varchar(9) |  |  |  |
| TL | varchar(10) |  |  |  |
| SCN | varchar(100) |  |  |  |
| SCE | varchar(100) |  |  |  |
| SCP | varchar(10) |  |  |  |
| SCC | varchar(10) |  |  |  |
| FNM | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FSP.ID = IDN.ID
- inferred → **STU**: FSP.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
