# QRY

Storage of many QUERY statements for use by all users

Rows: 5,785 · Primary key: SC, QN · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| QN | varchar(50) |  |  |  |
| QS | nvarchar(max) |  |  |  |
| QA | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: QRY.SC = LOC.CD (school code)
