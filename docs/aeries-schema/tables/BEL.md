# BEL

Bell Schedule for Secondary Schools, including Continuation or Alternative Schools

Rows: 795 · Primary key: SC, DY, PD · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → DAY.SC |
| PD | smallint |  |  |  |
| T1 | datetime | yes |  |  |
| T2 | datetime | yes |  |  |
| DY | smallint |  |  | FK → DAY.DY |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DAY**: BEL.SC = DAY.SC AND BEL.DY = DAY.DY
- inferred → **LOC**: BEL.SC = LOC.CD (school code)
