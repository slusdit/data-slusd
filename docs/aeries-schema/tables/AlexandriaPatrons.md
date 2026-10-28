# AlexandriaPatrons (view)


Primary key: (none declared) · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Site | nvarchar(max) | yes |  |  |
| LastName | nvarchar(100) |  |  | from STU.LN |
| FirstName | nvarchar(100) |  |  | from STU.FN |
| ID | int |  |  | from STU.ID |
| Grade | int |  |  |  |
| Teacher | nvarchar(30) |  |  |  |
| DOB | datetime | yes |  | from STU.BD |
| Sex | varchar(1) |  |  | from STU.SX |
| ParentGuardian | nvarchar(50) |  |  | from STU.PG |
| State | varchar(2) |  |  | from STU.ST |
| ZipCode | varchar(5) |  |  | from STU.ZC |
| Telephone | varchar(10) |  |  | from STU.TL |
