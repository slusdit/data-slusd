# llm_attendance_summary (view)


Primary key: (none declared) · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from STU.ID |
| school_id | smallint |  | School code | from STU.SC |
| student_number | int |  | Student number | from STU.SN |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| instructional_days | int | yes | Total instructional days |  |
| days_present | int | yes | Days present |  |
| days_absent | int | yes | Days absent |  |
| suspension_days | int | yes | Suspension days |  |
| unexcused_absences | int | yes | Unexcused absences |  |
| tardies | int | yes | Tardies |  |
| attendance_rate_percent | float | yes | Attendance rate % |  |
| absence_rate_percent | float | yes | Absence rate % |  |
| is_chronically_absent | varchar(7) |  | Is chronically absent (1/0) |  |
| truancy_risk_level | varchar(8) |  | Truancy risk level |  |
