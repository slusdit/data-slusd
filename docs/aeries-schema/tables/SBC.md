# SBC

Contains Comments that are given at grading time to an Elementary student

Rows: 180 · Primary key: SC, SN, YR, TM, RC · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| YR | smallint |  |  |  |
| TM | smallint |  |  |  |
| RC | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: SBC.SC = STU.SC AND SBC.SN = STU.SN
- inferred → **STU**: SBC.SC = STU.SC AND SBC.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: SBC.SC = LOC.CD (school code)
