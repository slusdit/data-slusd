# BSA

Summer Alternate Course Request Association Backup

Rows: 0 · Primary key: SEQ, ID, SSC, PSQ, ASQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SEQ | int |  |  | FK → SBU.SEQ |
| ID | int |  |  | → STU |
| SSC | smallint |  |  | FK → SBU.SC |
| PSQ | smallint |  |  |  |
| ASQ | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SBU**: BSA.SSC = SBU.SC AND BSA.SEQ = SBU.SEQ
- inferred → **STU**: BSA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
