# WIH

Contains score goals and other settings for the What If feature available in the Aeries Student app

Rows: 0 · Primary key: ID · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| WID | int |  |  | FK → WIG.ID |
| CGG | varchar(10) |  |  |  |
| AGR | money |  |  |  |
| AAG | bit |  |  |  |
| DAC | varchar(1) |  |  |  |
| AC | bit |  |  |  |
| DS | datetime |  |  |  |
| DE | datetime | yes |  |  |
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

- declared FK → **WIG**: WIH.WID = WIG.ID
- inferred → **STU**: WIH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
