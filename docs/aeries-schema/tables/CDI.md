# CDI

Code Table Image

Rows: 0 · Primary key: SC, TC, FC, CD · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| TC | varchar(4) |  |  |  |
| FC | varchar(4) |  |  |  |
| CD | nvarchar(6) |  |  |  |
| IMG | varbinary(max) | yes |  |  |
| ILG | varbinary(max) | yes |  |  |
| ITN | varbinary(max) | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: CDI.SC = LOC.CD (school code)
