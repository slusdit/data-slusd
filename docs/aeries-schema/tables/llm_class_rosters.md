# llm_class_rosters (view)


Primary key: (none declared) · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| school_id | smallint |  | School code | from MST.SC |
| section_number | smallint |  | Section number | from MST.SE |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| course_number | varchar(6) |  | Course number | from MST.CN |
| course_name | nvarchar(30) | yes | Course name | from CRS.CO |
| course_description | varchar(255) | yes | Course description | from CRS.DE |
| department_name | nvarchar(max) | yes | Department name | from COD.DE |
| period | smallint |  | Period | from MST.PD |
| room_number | varchar(6) |  | Room number | from MST.RM |
| teacher_number | smallint | yes | Teacher number | from TCH.TN |
| teacher_last_name | nvarchar(50) | yes | Teacher last name |  |
| teacher_first_name | varchar(20) | yes | Teacher first name | from STF.FN |
| teacher_email | nvarchar(255) | yes | Teacher email |  |
| student_id | int | yes | Student identifier | from STU.ID |
| student_number | int | yes | Student number | from STU.SN |
| student_last_name | nvarchar(100) | yes | Student last name | from STU.LN |
| student_first_name | nvarchar(100) | yes | Student first name | from STU.FN |
| student_grade_level | smallint | yes | Student grade level | from STU.GR |
| student_email | varchar(255) | yes | Student email | from STU.SEM |
| enrollment_status | varchar(7) |  | Enrollment status |  |
| current_class_size | int | yes | Current class size |  |
