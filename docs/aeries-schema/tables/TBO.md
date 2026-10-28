# TBO

Contains options about scanning and hand-entry of textbook assignment data

Rows: 1 · Primary key: SC, KY · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| T1 | bit |  |  |  |
| T2 | bit |  |  |  |
| T3 | bit |  |  |  |
| T4 | bit |  |  |  |
| T5 | bit |  |  |  |
| T6 | bit |  |  |  |
| T7 | bit |  |  |  |
| T8 | bit |  |  |  |
| KY | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: TBO.SC = LOC.CD (school code)
