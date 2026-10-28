# SLUSD_warm_body_elementary_totals (view)


Primary key: (none declared) · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Sch# | smallint |  |  | from DAY.SC |
| School | nvarchar(60) | yes |  | from LOC.NM |
| Room | varchar(6) | yes |  | from TCH.RM |
| Teacher# | smallint | yes |  | from TCH.TN |
| Teacher | nvarchar(30) | yes |  | from TCH.TE |
| Teacher Last | varchar(50) | yes |  | from TCH.TLN |
| Teacher First | nvarchar(20) | yes |  | from TCH.TF |
| Date | varchar(30) | yes |  |  |
| Term | varchar(1) |  |  |  |
| Section | varchar(1) |  |  |  |
| Course | varchar(1) |  |  |  |
| Period | varchar(1) |  |  |  |
| mx | smallint | yes |  | from TCH.MX |
| Enrollment | int | yes |  |  |
| Absences | int |  |  |  |
| Present | float | yes |  |  |
| Attendance Rate | float | yes |  |  |
