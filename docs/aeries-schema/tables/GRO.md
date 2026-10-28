# GRO

Contains school and user options dealing with Grade Reporting

Rows: 146 · Primary key: SC, NM, TY · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| NM | varchar(255) |  |  |  |
| TY | varchar(1) |  |  |  |
| CD | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: GRO.SC = LOC.CD (school code)
