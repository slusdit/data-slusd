# RVT

Rubric Value Types

Rows: 0 · Primary key: RID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | int |  |  |  |
| NM | nvarchar(50) |  |  |  |
| DE | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **RVM**: RVM.RID = RVT.RID
