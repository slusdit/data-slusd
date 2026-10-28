# SLUSD_AUTHORIZATIONS (view)


Primary key: (none declared) · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Sch# | smallint |  |  | from STU.SC |
| SC | nvarchar(60) | yes |  | from LOC.NM |
| ID | int |  |  | from STU.ID |
| LN | nvarchar(100) |  |  | from STU.LN |
| FN | nvarchar(100) |  |  | from STU.FN |
| GR | smallint |  |  | from STU.GR |
| DT | datetime | yes |  | from AUT.DT |
| TY | varchar(1) |  |  |  |
| AUT_TY | nvarchar(max) |  |  |  |
| AUT_CD | nvarchar(max) |  |  |  |
| ST | varchar(30) |  |  |  |
| AUT_ST | nvarchar(max) |  |  |  |
