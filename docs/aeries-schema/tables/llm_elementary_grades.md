# llm_elementary_grades (view)


Primary key: (none declared) · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from STU.ID |
| school_id | smallint |  | School code | from STU.SC |
| student_number | int |  | Student number | from STU.SN |
| last_name | nvarchar(100) |  | Last name | from STU.LN |
| first_name | nvarchar(100) |  | First name | from STU.FN |
| grade_level | smallint |  | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| homeroom_teacher_number | smallint |  | Homeroom teacher number | from STU.CU |
| teacher_last_name | nvarchar(50) | yes | Teacher last name |  |
| teacher_first_name | varchar(20) | yes | Teacher first name | from STF.FN |
| teacher_email | nvarchar(255) | yes | Teacher email |  |
| room_number | varchar(6) | yes | Room number | from TCH.RM |
| teacher_grade_low | smallint | yes | Teacher low grade | from TCH.LO |
| teacher_grade_high | smallint | yes | Teacher high grade | from TCH.HI |
| teacher_grade_range | varchar(67) | yes | Teacher grade range |  |
| school_level | varchar(10) |  | School level |  |
| pseudo_section_id | varchar(61) | yes | Pseudo section ID |  |
