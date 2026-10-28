# CountyDirectCert (view)


Primary key: (none declared) · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Student-ID | varchar(30) | yes |  |  |
| Student-Last-Name | nvarchar(4000) | yes |  |  |
| Student-First-Name | nvarchar(4000) | yes |  |  |
| Student-Birthdate | varchar(30) | yes |  |  |
| Student-Gender | varchar(14) |  |  | from COUNTYDIRECTCERT.Student-Gender |
| Student-Adress | varchar(8000) | yes |  |  |
| Student-City | varchar(30) |  |  | from COUNTYDIRECTCERT.Student-City |
| Student-Zip | varchar(30) | yes |  |  |
| Student-Grade-Level | varchar(30) | yes |  |  |
| School-Code | varchar(30) | yes |  |  |
| School-Name | nvarchar(max) |  |  | from COUNTYDIRECTCERT.School-Name |
| Student-SSNBR | varchar(13) |  |  |  |
