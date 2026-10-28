# MIISS_elementary_office_referrals (view)


Primary key: (none declared) · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Sch# | smallint |  |  | from STU.SC |
| School | nvarchar(max) |  |  | from COD.DE |
| PermID | int |  |  | from STU.ID |
| Grade | smallint |  |  | from STU.GR |
| Last Name | nvarchar(100) |  |  | from STU.LN |
| First Name | nvarchar(100) |  |  | from STU.FN |
| Code | varchar(2) |  |  | from ADS.CD |
| DE | nvarchar(max) |  |  | from COD.DE |
| Date | datetime | yes |  | from ADS.DT |
| TRIMESTER | varchar(1) |  |  | from TRM.TM |
