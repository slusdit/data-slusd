# BWL

Backup Scheduling Wait List

Rows: 0 · Primary key: SEQ, SCL, SE, ID · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SEQ | int |  |  | FK → SBU.SEQ |
| SCL | smallint |  |  | FK → SBU.SC |
| SE | smallint |  |  |  |
| ID | int |  |  | → STU |
| SRT | float |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SBU**: BWL.SCL = SBU.SC AND BWL.SEQ = SBU.SEQ
- inferred → **STU**: BWL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
