# SLUSD_Instructional_Minutes (view)


Primary key: (none declared) · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Sch# | smallint |  |  |  |
| School | nvarchar(60) | yes |  | from SLUSD_INSTRUCTIONAL_MINUTES.School |
| Year | varchar(9) |  |  |  |
| Calendar Title | varchar(6) |  |  |  |
| Calendar Description | varchar(255) |  |  |  |
| Calendar Week | int | yes |  |  |
| Monday Date | datetime |  |  |  |
| Calendar Date | datetime |  |  |  |
| Remote Synchronous | varchar(11) |  |  |  |
| Remote Asynchronous | varchar(11) |  |  |  |
| Section | smallint |  |  | from SLUSD_INSTRUCTIONAL_MINUTES.Section |
| Course# | varchar(6) |  |  | from SLUSD_INSTRUCTIONAL_MINUTES.Course# |
| Course | nvarchar(30) | yes |  | from SLUSD_INSTRUCTIONAL_MINUTES.Course |
| Period | smallint |  |  | from SLUSD_INSTRUCTIONAL_MINUTES.Period |
| Teacher# | smallint |  |  | from SLUSD_INSTRUCTIONAL_MINUTES.Teacher# |
| Teacher | nvarchar(30) | yes |  | from SLUSD_INSTRUCTIONAL_MINUTES.Teacher |
| Minutes Certified | nvarchar(max) | yes |  | from SLUSD_INSTRUCTIONAL_MINUTES.Minutes Certified |
| Insert Date | datetime | yes |  | from SLUSD_INSTRUCTIONAL_MINUTES.Insert Date |
| Insert User ID | int | yes |  | from SLUSD_INSTRUCTIONAL_MINUTES.Insert User ID |
| Insert User Name | varchar(255) | yes |  | from SLUSD_INSTRUCTIONAL_MINUTES.Insert User Name |
| Update User ID | int | yes |  | from SLUSD_INSTRUCTIONAL_MINUTES.Update User ID |
| Update User Name | varchar(255) | yes |  | from SLUSD_INSTRUCTIONAL_MINUTES.Update User Name |
