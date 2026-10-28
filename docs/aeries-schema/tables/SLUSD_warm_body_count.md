# SLUSD_warm_body_count (view)


Primary key: (none declared) · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Sch# | smallint |  |  |  |
| School | nvarchar(60) | yes |  | from SLUSD_WARM_BODY_COUNT.School |
| Room | varchar(6) | yes |  |  |
| Teacher# | smallint | yes |  |  |
| Teacher | nvarchar(30) | yes |  |  |
| Teacher Last | varchar(50) | yes |  | from SLUSD_WARM_BODY_COUNT.Teacher Last |
| Teacher First | nvarchar(20) | yes |  | from SLUSD_WARM_BODY_COUNT.Teacher First |
| Date | date | yes |  |  |
| Term | varchar(1) | yes |  |  |
| Section | smallint | yes |  |  |
| Course | nvarchar(30) | yes |  |  |
| Period | smallint | yes |  |  |
| Enrollment | int | yes |  |  |
| Absences | int |  |  |  |
| Present | float | yes |  |  |
| Attendance Rate | float | yes |  |  |
| Grade Level | varchar(61) | yes |  |  |
| Class Size Max | smallint | yes |  |  |
