# SLUSD_VPC_CODES (view)


Primary key: (none declared) · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| School Type | varchar(19) | yes |  |  |
| Correspondence Language | varchar(7) | yes |  |  |
| Family Key | int |  |  | from STU.FK |
| School# | smallint |  |  | from STU.SC |
| School Name | nvarchar(60) | yes |  | from LOC.NM |
| PermID | int |  |  | from STU.ID |
| Last | nvarchar(100) |  |  | from STU.LN |
| First | nvarchar(100) |  |  | from STU.FN |
| Grade | smallint |  |  | from STU.GR |
| Enrollment Status | varchar(1) |  |  | from STU.TG |
| Next School | smallint |  |  | from STU.NS |
| Next Grade | smallint |  |  | from STU.NG |
| PERIOD | varchar(30) | yes |  |  |
| CU | smallint |  |  | from STU.CU |
| TEACHER | nvarchar(30) | yes |  |  |
| Parent/Guardian | nvarchar(50) |  |  | from STU.PG |
| Address | varchar(55) |  |  | from STU.AD |
| City | varchar(30) |  |  | from STU.CY |
| State | varchar(2) |  |  | from STU.ST |
| ZIP Code | varchar(5) |  |  | from STU.ZC |
| Primary Phone | varchar(10) |  |  | from STU.TL |
| Verification Pass Code | varchar(20) |  |  | from STU.VPC |
