# SLUSD_secondary_student_absences (view)


Primary key: (none declared) · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| sc | smallint |  |  | from STU.SC |
| SN | int |  |  | from STU.SN |
| GR | smallint |  |  | from STU.GR |
| calendar_dt | datetime | yes |  | from DAY.DT |
| CODE | varchar(30) | yes |  |  |
| absence_period | nvarchar(128) | yes |  |  |
| SE | smallint | yes |  | from CAR.SE |
| CN | varchar(6) | yes |  | from CAR.CN |
| CO | nvarchar(30) | yes |  | from CRS.CO |
| Absences | int | yes |  |  |
