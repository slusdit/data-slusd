# BAC

Alternate Course Requests Backup

Rows: 54,387 · Primary key: SEQ, SC, SN, SQ · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SEQ | int |  |  | FK → SBU.SEQ |
| SC | smallint |  |  | FK → SBU.SC |
| SN | int |  |  | → STU |
| SQ | smallint |  |  |  |
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

- declared FK → **SBU**: BAC.SC = SBU.SC AND BAC.SEQ = SBU.SEQ
- inferred → **STU**: BAC.SC = STU.SC AND BAC.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **CRS**: BAC.CN = CRS.CN (course number)
- inferred → **LOC**: BAC.SC = LOC.CD (school code)
