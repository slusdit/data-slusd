# SAB

Summer Alternate Course Req. Backup

Rows: 0 · Primary key: SEQ, ID, SSC, SQ · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SEQ | int |  |  | FK → SBU.SEQ |
| ID | int |  |  | → STU |
| SSC | smallint |  |  | FK → SBU.SC |
| SQ | smallint |  |  |  |
| TM | varchar(1) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| SRT | float |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SBU**: SAB.SSC = SBU.SC AND SAB.SEQ = SBU.SEQ
- inferred → **STU**: SAB.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: SAB.CN = CRS.CN (course number)
