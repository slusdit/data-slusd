# AWL

Master Schedule Wait List

Rows: 0 · Primary key: SCL, SE, ID · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SCL | smallint |  |  | FK → MST.SC |
| SE | smallint |  |  | FK → MST.SE |
| ID | int |  |  | FK → IDN.ID |
| SRT | float |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: AWL.ID = IDN.ID
- declared FK → **MST**: AWL.SCL = MST.SC AND AWL.SE = MST.SE
- inferred → **STU**: AWL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
