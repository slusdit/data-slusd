# FOLLETT_PATRONS_STAFF (view)


Primary key: (none declared) · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| BARCODE | int |  |  | from STF.ID |
| DISTRICTID | int |  |  | from STF.ID |
| BUILDING | smallint |  |  | from STF.PSC |
| LASTNAME | nvarchar(100) | yes |  |  |
| FIRSTNAME | nvarchar(100) | yes |  |  |
| HOMEROOM | varchar(6) | yes |  |  |
| GENDER | varchar(1) |  |  | from STF.SX |
| USERNAME | varchar(255) | yes |  |  |
| PASSWORD | varchar(1) |  |  |  |
| TITLE | varchar(100) | yes |  |  |
