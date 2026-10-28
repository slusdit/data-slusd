# SLUSD_eTrition (view)


Primary key: (none declared) · Columns: 28

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Patron Number | varchar(10) | yes |  |  |
| Patron First Name | varchar(25) | yes |  |  |
| Patron Last Name | varchar(25) | yes |  |  |
| Patron Middle Name | varchar(25) | yes |  |  |
| Ethnicity | varchar(1) |  |  | from STU.ETH |
| Race | varchar(3) |  |  | from STU.RC1 |
| Gender | nvarchar(1) |  |  | from STU.GN |
| Birthdate | varchar(30) | yes |  |  |
| SSN | varchar(1) |  |  |  |
| Comment | varchar(1) |  |  |  |
| Patron Type | varchar(7) |  |  |  |
| School | varchar(30) | yes |  |  |
| Grade | varchar(30) | yes |  |  |
| Enrollment Start Date | varchar(30) | yes |  |  |
| Enrollment Drop Date | varchar(30) | yes |  |  |
| Homeroom | varchar(6) |  |  |  |
| Enrollment Type | varchar(9) |  |  |  |
| Household Number | varchar(1) |  |  |  |
| Household First Name | nvarchar(100) | yes |  | from STU.FN |
| Household Last Name | nvarchar(100) | yes |  | from STU.LN |
| Email | varchar(255) |  |  |  |
| Language | varchar(30) | yes |  |  |
| Phone Number | varchar(10) |  |  | from STU.TL |
| Address | varchar(8000) | yes |  |  |
| City | varchar(30) | yes |  |  |
| State | varchar(2) | yes |  |  |
| Zip | varchar(5) |  |  | from STU.ZC |
| POS PIN | varchar(30) | yes |  |  |
