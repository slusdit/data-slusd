# WIA

Contains the assignment scores for the What If feature available in the Aeries Student app

Rows: 0 · Primary key: ID · Columns: 20

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| WID | int |  |  | FK → WIG.ID |
| AN | int |  |  |  |
| AC | varchar(1) |  |  |  |
| TI | nvarchar(255) |  |  |  |
| EA | bit |  |  |  |
| TY | smallint |  |  |  |
| SCC | bit |  |  |  |
| SCR | money |  |  |  |
| MX | money |  |  |  |
| DT | datetime |  |  |  |
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

- declared FK → **WIG**: WIA.WID = WIG.ID
- inferred → **STU**: WIA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
