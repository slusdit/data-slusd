# ARB


Rows: 0 · Primary key: ID · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| TSD | smallint |  |  |  |
| THE | smallint |  |  |  |
| TME | int |  |  |  |
| TMA | int |  |  |  |
| TAB | smallint |  |  |  |
| TRV | smallint |  |  |  |
| TMU | int |  |  |  |
| TAA | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ARB.ID = IDN.ID
- inferred → **STU**: ARB.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
