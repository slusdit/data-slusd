# llm_student_enrollment (view)


Primary key: (none declared) · Columns: 20

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from ENR.ID |
| school_id | smallint |  | School code | from ENR.SC |
| student_number | int |  | Student number | from ENR.SN |
| school_year | smallint |  | School year | from ENR.YR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| entry_date | datetime |  | Entry date | from ENR.ED |
| leave_date | datetime | yes | Leave date | from ENR.LD |
| enrollment_status | varchar(18) |  | Enrollment status |  |
| days_enrolled | int | yes | Days enrolled |  |
| grade_level_at_enrollment | smallint |  | Grade at enrollment | from ENR.GR |
| entry_reason_code | varchar(3) |  | Entry reason code | from ENR.ER |
| entry_reason | nvarchar(max) | yes | Entry reason description | from COD.DE |
| homeroom_teacher_number | smallint |  | Homeroom teacher number | from ENR.TN |
| homeroom_teacher_name | nvarchar(50) | yes | Homeroom teacher name |  |
| homeroom_teacher_email | nvarchar(255) | yes | Homeroom teacher email |  |
| track | varchar(1) |  | Track | from ENR.TR |
| program | varchar(1) |  | Program | from ENR.PR |
| is_current_year | int |  | Is current year (1/0) |  |
