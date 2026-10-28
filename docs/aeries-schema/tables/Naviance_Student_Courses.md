# Naviance_Student_Courses (view)


Primary key: (none declared) · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| STUDENT_ID | int |  |  | from NAVIANCE_STUDENT_COURSES.STUDENT_ID |
| COURSE_ID | varchar(6) |  |  | from NAVIANCE_STUDENT_COURSES.COURSE_ID |
| GRADE_LEVEL | smallint |  |  | from NAVIANCE_STUDENT_COURSES.GRADE_LEVEL |
| TERM | varchar(30) | yes |  |  |
| COURSE_NAME | nvarchar(30) |  |  | from NAVIANCE_STUDENT_COURSES.COURSE_NAME |
| CREDITS_EARNED | money |  |  | from NAVIANCE_STUDENT_COURSES.CREDITS_EARNED |
| LETTER_GRADE | varchar(3) |  |  | from NAVIANCE_STUDENT_COURSES.LETTER_GRADE |
| COURSE_STATUS | varchar(11) |  |  |  |
