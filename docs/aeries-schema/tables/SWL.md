# SWL

Scheduling Master Schedule Wait List

Rows: 0 · Primary key: SCL, SE, ID · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SCL | smallint |  |  | FK → SMS.SC |
| SE | smallint |  |  | FK → SMS.SE |
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

- declared FK → **IDN**: SWL.ID = IDN.ID
- declared FK → **SMS**: SWL.SCL = SMS.SC AND SWL.SE = SMS.SE
- inferred → **STU**: SWL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
