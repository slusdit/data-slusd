# GTG

Defines percent range for each mark for Gradebook to Grades for Report Cards

Rows: 30,376 · Primary key: GN, MK, TY · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GN | int |  |  | FK → GBK.GN |
| MK | nvarchar(3) |  |  |  |
| LO | money |  |  |  |
| HI | money |  |  |  |
| TY | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBK**: GTG.GN = GBK.GN
