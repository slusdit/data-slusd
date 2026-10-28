# SLUSD_warmbody_secondary_absences (view)


Primary key: (none declared) · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| sc | smallint |  |  | from STU.SC |
| calendar_dt | datetime | yes |  | from DAY.DT |
| absence_period | nvarchar(128) | yes |  |  |
| SE | smallint | yes |  | from CAR.SE |
| CN | varchar(6) | yes |  | from CAR.CN |
| CO | nvarchar(30) | yes |  | from CRS.CO |
| Absences | int | yes |  |  |
