# MIISS_elementary_tardy (view)


Primary key: (none declared) · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | from TRM.SC |
| ID | int |  |  | from STU.ID |
| GR | smallint |  |  | from STU.GR |
| LN | nvarchar(100) |  |  | from STU.LN |
| FN | nvarchar(100) |  |  | from STU.FN |
| DT | datetime | yes |  | from ATT.DT |
| TRIMESTER | varchar(1) |  |  | from TRM.TM |
| Total Tardy or Very Late | int | yes |  |  |
