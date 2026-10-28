# SLUSD_DAILY_ENROLLMENT (view)


Primary key: (none declared) · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Database Name | nvarchar(128) | yes |  |  |
| SC | smallint |  |  | from DAY.SC |
| NM | nvarchar(60) | yes |  | from LOC.NM |
| School | nvarchar(60) | yes |  | from LOC.NM |
| DY | smallint |  |  | from DAY.DY |
| Day# | varchar(30) | yes |  |  |
| DT | datetime | yes |  | from DAY.DT |
| Date | datetime | yes |  | from DAY.DT |
| NOT_FOR_ADA | int | yes |  |  |
| ENROLLMENT_FOR_ADA | int | yes |  |  |
| TOTAL_ENROLLMENT | int | yes |  |  |
