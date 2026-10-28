# MIISS_suspensions (view)


Primary key: (none declared) · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Sch# | smallint |  |  | from STU.SC |
| School | nvarchar(max) |  |  | from COD.DE |
| PermID | int |  |  | from STU.ID |
| Last Name | nvarchar(100) |  |  | from STU.LN |
| First Name | nvarchar(100) |  |  | from STU.FN |
| Grade | smallint |  |  | from STU.GR |
| INFRACTION_DATE | datetime | yes |  | from ADS.DT |
| COMMENT | nvarchar(max) |  |  | from ADS.CO |
| DISPOSITION | varchar(20) |  |  | from DSP.DS |
| DISPOSITION_DATE | datetime | yes |  | from DSP.DD |
| CURRENT_YEAR | int | yes |  |  |
| CU | smallint |  |  | from STU.CU |
