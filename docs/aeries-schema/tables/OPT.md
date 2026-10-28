# OPT

Used by reports and Forms – School wide options which ADD to Variables

Rows: 5,741 · Primary key: SC, NM · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| NM | varchar(255) |  |  |  |
| CD | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: OPT.SC = LOC.CD (school code)
