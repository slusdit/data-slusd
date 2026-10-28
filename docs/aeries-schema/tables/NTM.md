# NTM


Rows: 0 · Primary key: SC, TM · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| TM | varchar(1) |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| H1 | datetime | yes |  |  |
| H2 | datetime | yes |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: NTM.SC = LOC.CD (school code)
