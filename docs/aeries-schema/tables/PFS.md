# PFS

Stores specific Tests selected by administrators to be performed at the school level.

Rows: 332 · Primary key: SC, TA, TID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| TA | varchar(6) |  |  |  |
| TID | varchar(4) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: PFS.SC = LOC.CD (school code)
