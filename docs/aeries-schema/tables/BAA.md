# BAA

Alternate Course Request Association Backup

Rows: 6,820 · Primary key: SEQ, SC, SN, PSQ, ASQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SEQ | int |  |  | FK → SBU.SEQ |
| SC | smallint |  |  | FK → SBU.SC |
| SN | int |  |  | → STU |
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

- declared FK → **SBU**: BAA.SC = SBU.SC AND BAA.SEQ = SBU.SEQ
- inferred → **STU**: BAA.SC = STU.SC AND BAA.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: BAA.SC = LOC.CD (school code)
