# TTM

Stores starting and ending dates for terms defined in HIS for all previous years. CSIS use ONLY.

Rows: 0 · Primary key: SC, YR, TM · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| YR | smallint |  |  |  |
| TM | smallint |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: TTM.SC = LOC.CD (school code)
