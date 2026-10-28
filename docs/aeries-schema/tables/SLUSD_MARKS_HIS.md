# SLUSD_MARKS_HIS (view)


Primary key: (none declared) · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SOURCE | nvarchar(128) | yes |  |  |
| School Year | varchar(61) | yes |  |  |
| SC | smallint |  |  | from STU.SC |
| ID | int |  |  | from STU.ID |
| SN | int |  |  | from STU.SN |
| GR | smallint |  |  | from STU.GR |
| CR | money |  |  | from HIS.CR |
| HIS_GR | smallint |  |  | from HIS.GR |
| HIS_TERM | smallint |  |  | from HIS.TE |
| HIS_YR | smallint |  |  | from HIS.YR |
| HIS_COURSE | varchar(30) |  |  | from HIS.CO |
| CRS_COURSE | nvarchar(30) |  |  | from CRS.CO |
| HIS_ST | int |  |  | from HIS.ST |
| MK | varchar(3) |  |  | from HIS.MK |
