# SPS

Defines which programs are to be used for dis-aggregation of data

Rows: 8 · Primary key: SC, PR · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| PR | varchar(50) |  |  |  |
| PD | varchar(50) |  |  |  |
| QS | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: SPS.SC = LOC.CD (school code)
