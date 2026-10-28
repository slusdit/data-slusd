# llm_course_enrollments (view)


Primary key: (none declared) · Columns: 27

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int | yes | Student identifier | from STU.ID |
| school_id | smallint |  | School code | from SEC.SC |
| student_number | int |  | Student number | from SEC.SN |
| section_number | smallint |  | Section number | from SEC.SE |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| course_number | varchar(6) | yes | Course number | from MST.CN |
| course_name | nvarchar(30) | yes | Course name | from CRS.CO |
| course_description | varchar(255) | yes | Course description | from CRS.DE |
| department_code | varchar(6) | yes | Department code | from CRS.DC |
| department_name | nvarchar(max) | yes | Department name | from COD.DE |
| state_course_code | varchar(8) | yes | State course code | from CRS.CS |
| section_id | smallint | yes | Section ID | from MST.SE |
| period | smallint | yes | Period | from MST.PD |
| room_number | varchar(6) | yes | Room number | from MST.RM |
| teacher_number | smallint | yes | Teacher number | from MST.TN |
| teacher_last_name | nvarchar(50) | yes | Teacher last name |  |
| teacher_first_name | varchar(20) | yes | Teacher first name | from STF.FN |
| teacher_email | nvarchar(255) | yes | Teacher email |  |
| schedule_mode | varchar(1) | yes | Schedule mode | from MST.SM |
| schedule_mode_description | varchar(11) | yes | Schedule mode description |  |
| enrollment_status | varchar(18) |  | Enrollment status |  |
| credits | money | yes | Credits | from CRS.CR |
| track | varchar(1) | yes | Track | from MST.TR |
| is_currently_enrolled | int |  | Is currently enrolled (1/0) |  |
