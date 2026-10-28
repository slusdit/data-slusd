# AListofIDNandSTU (view)


Primary key: (none declared) · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | from IDN.ID |
| LN | nvarchar(100) |  |  | from IDN.LN |
| FN | nvarchar(100) |  |  | from IDN.FN |
| BD | datetime | yes |  | from IDN.BD |
| SX | varchar(1) |  |  | from IDN.SX |
| DEL | bit |  |  | from IDN.DEL |
| DTS | datetime | yes |  | from IDN.DTS |
| Expr1 | int |  |  | from STU.ID |
| SC | smallint |  |  | from STU.SC |
| SN | int |  |  | from STU.SN |
| Expr2 | nvarchar(100) |  |  | from STU.LN |
| Expr3 | nvarchar(100) |  |  | from STU.FN |
| Expr4 | varchar(1) |  |  | from STU.SX |
| GR | smallint |  |  | from STU.GR |
| Expr5 | datetime | yes |  | from STU.BD |
