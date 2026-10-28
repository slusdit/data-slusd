# FOOD_SERVICE_CUSTOMERS (view)


Primary key: (none declared) · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Student ID # | int |  |  | from STU.ID |
| First Name | varchar(25) | yes |  |  |
| Last Name | varchar(25) | yes |  |  |
| Middle Initial | nvarchar(1) | yes |  |  |
| Date of Birth | varchar(30) | yes |  |  |
| street Address | varchar(50) | yes |  |  |
| City | varchar(30) | yes |  |  |
| State | varchar(2) | yes |  |  |
| Zip | varchar(5) |  |  | from STU.ZC |
| School Code/Name | smallint | yes |  |  |
| Grade Level | smallint | yes |  |  |
| Homeroom | varchar(6) | yes |  | from TCH.RM |
| Teacher | nvarchar(30) | yes |  | from TCH.TE |
| Guardian | varchar(50) | yes |  |  |
| Phone Number | varchar(10) |  |  | from STU.TL |
| Email Address | varchar(255) | yes |  |  |
| Pin# | int |  |  | from STU.SN |
| Notes | varchar(1) |  |  |  |
| corrLang | varchar(7) |  |  |  |
