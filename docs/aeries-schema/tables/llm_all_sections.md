# llm_all_sections (view)


Primary key: (none declared) · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| section_id | varchar(61) | yes | Section ID |  |
| school_id | smallint |  | School code | from LLM_ALL_SECTIONS.school_id |
| school_name | nvarchar(60) | yes | School name | from LLM_ALL_SECTIONS.school_name |
| term | varchar(1) |  | Term |  |
| period | varchar(30) | yes | Period |  |
| course_id | varchar(30) | yes | Course ID |  |
| course_name | nvarchar(30) | yes | Course name |  |
| teacher_staff_id | int | yes | Teacher staff ID | from LLM_ALL_SECTIONS.teacher_staff_id |
| teacher_number | smallint | yes | Teacher number | from LLM_ALL_SECTIONS.teacher_number |
| teacher_last_name | nvarchar(50) | yes | Teacher last name |  |
| teacher_first_name | varchar(20) | yes | Teacher first name | from LLM_ALL_SECTIONS.teacher_first_name |
| teacher_email | nvarchar(255) | yes | Teacher email |  |
| room_number | varchar(6) |  | Room number | from LLM_ALL_SECTIONS.room_number |
| grade_high | smallint | yes | High grade | from LLM_ALL_SECTIONS.grade_high |
| grade_low | smallint | yes | Low grade | from LLM_ALL_SECTIONS.grade_low |
| school_level | varchar(10) |  | School level |  |
| student_count | int | yes | Student count |  |
