# SLUSD_MARKS_GRD (view)


Primary key: (none declared) · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SOURCE | nvarchar(128) | yes |  |  |
| School Year | varchar(61) | yes |  |  |
| SC | smallint |  |  | from STU.SC |
| ID | int |  |  | from STU.ID |
| SN | int |  |  | from STU.SN |
| GR | smallint |  |  | from STU.GR |
| PD | smallint |  |  | from GRD.PD |
| DEPT_CODE | nvarchar(max) | yes |  | from COD.DE |
| DC | varchar(6) |  |  | from CRS.DC |
| CN | varchar(6) |  |  | from GRD.CN |
| CO | nvarchar(30) |  |  | from CRS.CO |
| TN | smallint |  |  | from GRD.TN |
| SE | smallint |  |  | from GRD.SE |
| TERM | varchar(4) | yes |  |  |
| MARK | nvarchar(3) |  |  |  |
