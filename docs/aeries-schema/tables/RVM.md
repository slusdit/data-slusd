# RVM

Rubric Value Marks

Rows: 0 · Primary key: RID, MK · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | int |  |  | FK → RVT.RID |
| MK | nvarchar(20) |  |  |  |
| VL | money |  |  |  |
| DE | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **RVT**: RVM.RID = RVT.RID
