# llm_teacher_student_roster (view)


Primary key: (none declared) · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from LLM_TEACHER_STUDENT_ROSTER.student_id |
| school_id | smallint |  | School code | from LLM_TEACHER_STUDENT_ROSTER.school_id |
| student_number | int |  | Student number | from LLM_TEACHER_STUDENT_ROSTER.student_number |
| last_name | nvarchar(100) |  | Last name | from LLM_TEACHER_STUDENT_ROSTER.last_name |
| first_name | nvarchar(100) |  | First name | from LLM_TEACHER_STUDENT_ROSTER.first_name |
| grade_level | smallint |  | Grade level | from LLM_TEACHER_STUDENT_ROSTER.grade_level |
| teacher_staff_id | int |  | Teacher staff ID | from LLM_TEACHER_STUDENT_ROSTER.teacher_staff_id |
| teacher_number | smallint |  | Teacher number | from LLM_TEACHER_STUDENT_ROSTER.teacher_number |
| teacher_last_name | nvarchar(50) | yes | Teacher last name |  |
| teacher_first_name | varchar(20) | yes | Teacher first name | from LLM_TEACHER_STUDENT_ROSTER.teacher_first_name |
| teacher_email | nvarchar(255) |  | Teacher email |  |
| assignment_type | varchar(19) |  | Assignment type |  |
| section_number | smallint | yes | Section number |  |
| course_name | nvarchar(30) | yes | Course name |  |
| period | smallint | yes | Period |  |
| teacher_section_id | varchar(61) | yes | Teacher section ID |  |
