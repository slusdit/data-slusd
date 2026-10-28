# BST

Contains data from Bell Scheduler

Rows: 149 · Primary key: SC, KY, PD, PS · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → BSD.SC |
| KY | smallint |  |  | FK → BSD.KY |
| PD | smallint |  |  |  |
| PS | smallint |  |  |  |
| TY | varchar(1) |  |  |  |
| T1 | datetime | yes |  |  |
| T2 | datetime | yes |  |  |
| DE | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **BSD**: BST.SC = BSD.SC AND BST.KY = BSD.KY
- inferred → **LOC**: BST.SC = LOC.CD (school code)
