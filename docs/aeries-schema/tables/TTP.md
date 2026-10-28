# TTP

Defines which Test Scores, Activities, Immunizations, Student fields etc. are to print on Transcripts

Rows: 64 · Primary key: SC, TBL, TN, PT, SCR · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → TCH, LOC |
| TBL | varchar(5) |  |  |  |
| TN | varchar(20) |  |  | → TCH |
| PT | varchar(20) |  |  |  |
| SCR | varchar(255) |  |  |  |
| PO | smallint |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| UST | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **TCH**: TTP.SC = TCH.SC AND TTP.TN = TCH.TN (teacher number)
- inferred → **LOC**: TTP.SC = LOC.CD (school code)
