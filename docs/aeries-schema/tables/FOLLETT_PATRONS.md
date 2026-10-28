# FOLLETT_PATRONS (view)


Primary key: (none declared) · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| BARCODE | int |  |  | from STU.ID |
| DISTRICTID | int |  |  | from STU.ID |
| BUILDING | smallint |  |  | from STU.SC |
| LASTNAME | nvarchar(100) | yes |  |  |
| FIRSTNAME | nvarchar(100) | yes |  |  |
| GRADELEVEL | smallint |  |  | from STU.GR |
| HOMEROOM | varchar(50) | yes |  |  |
| GRADUATIONYEAR | int | yes |  |  |
| GENDER | nvarchar(1) |  |  | from STU.GN |
| USERNAME | varchar(255) |  |  | from STU.SEM |
| PASSWORD | varchar(1) |  |  |  |
