# SLUSD_eTrition_Hosted_Aeries (view)


Primary key: (none declared) · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | from STU.ID |
| First | nvarchar(100) |  |  | from STU.FN |
| Last | nvarchar(100) |  |  | from STU.LN |
| Middle | nvarchar(100) |  |  | from STU.MN |
| Sex | varchar(1) |  |  | from STU.SX |
| Birthdate | varchar(30) | yes |  |  |
| School | int |  |  |  |
| Grade | smallint |  |  | from STU.GR |
| START_DATE | varchar(30) | yes |  |  |
| LEAVE_DATE | int | yes |  |  |
| Home Room | nvarchar(52) | yes |  |  |
| Parent/guardian | nvarchar(50) |  |  | from STU.PG |
| Email | varchar(255) |  |  | from STU.PEM |
| Home Phone | varchar(10) |  |  | from STU.TL |
| Mailing Address | varchar(55) |  |  | from STU.AD |
| City | varchar(30) |  |  | from STU.CY |
| State | varchar(2) |  |  | from STU.ST |
| Zip code | varchar(5) |  |  | from STU.ZC |
| PIN | int |  |  | from STU.SN |
| Language | varchar(2) |  |  | from STU.CL |
| FamilyKey | int |  |  | from STU.FK |
