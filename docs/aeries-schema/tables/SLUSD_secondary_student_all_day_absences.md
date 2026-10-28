# SLUSD_secondary_student_all_day_absences (view)


Primary key: (none declared) · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Date | datetime | yes |  | from DAY.DT |
| Sch# | smallint |  |  | from STU.SC |
| Last | nvarchar(100) |  |  | from STU.LN |
| First | nvarchar(100) |  |  | from STU.FN |
| PermID | int |  |  | from STU.ID |
| TG | varchar(1) |  |  | from STU.TG |
| SCHOOL | varchar(30) | yes |  |  |
| StuNum | int |  |  | from STU.SN |
| Grade | smallint |  |  | from STU.GR |
| Enter Date | datetime | yes |  | from ENR.ED |
| Leave Date | datetime | yes |  | from ENR.LD |
| Enrollment Status | varchar(12) |  |  |  |
| Number of Absences | int |  |  |  |
| Number of Sections | int |  |  |  |
| Absence Status | varchar(7) |  |  |  |
