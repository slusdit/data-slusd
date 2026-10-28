# llm_attendance_daily (view)


Primary key: (none declared) · Columns: 26

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int | yes | Student identifier | from STU.ID |
| school_id | smallint |  | School code | from ATT.SC |
| student_number | int |  | Student number | from ATT.SN |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| day_number | smallint |  | Day number | from ATT.DY |
| attendance_date | date | yes | Attendance date |  |
| day_of_week | nvarchar(30) | yes | Day of week |  |
| all_day_code | varchar(1) |  | All-day attendance code | from ATT.AL |
| all_day_description | varchar(10) | yes | All-day description | from ABS.TI |
| all_day_status | varchar(7) |  | All-day status |  |
| all_day_counts_as_present | bit | yes | Counts as present (1/0) | from ABS.AD |
| all_day_suspension_related | bit | yes | Suspension related (1/0) | from ABS.SU |
| period_0_code | nvarchar(1) |  | Period 0 code | from ATT.A0 |
| period_1_code | nvarchar(1) |  | Period 1 code | from ATT.A1 |
| period_2_code | nvarchar(1) |  | Period 2 code | from ATT.A2 |
| period_3_code | nvarchar(1) |  | Period 3 code | from ATT.A3 |
| period_4_code | nvarchar(1) |  | Period 4 code | from ATT.A4 |
| period_5_code | nvarchar(1) |  | Period 5 code | from ATT.A5 |
| period_6_code | nvarchar(1) |  | Period 6 code | from ATT.A6 |
| period_absence_count | int | yes | Period absence count |  |
| overall_attendance_code | nvarchar(1) |  | Overall attendance code | from ATT.CD |
| was_absent_all_day | int |  | Was absent all day (1/0) |  |
| is_suspension_absence | int |  | Is suspension absence (1/0) |  |
