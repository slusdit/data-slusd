# SLUSD_elementary_daily_attendance (view)


Primary key: (none declared) · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | from ENR.SC |
| ID | int | yes |  | from ENR.ID |
| SN | int | yes |  | from ENR.SN |
| GR | smallint | yes |  | from STU.GR |
| DAY# | bigint | yes |  |  |
| DY | smallint |  |  | from DAY.DY |
| DT | datetime | yes |  | from DAY.DT |
| TN | smallint | yes |  | from ENR.TN |
| Missing Attedance | varchar(30) |  |  |  |
| enrollment_status | varchar(12) | yes |  |  |
| AbsCode | varchar(30) | yes |  |  |
