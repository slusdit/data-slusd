# llm_student_gpa (view)


Primary key: (none declared) · Columns: 15

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
| current_gpa | money |  | Current GPA | from STU.GP |
| cumulative_credits | smallint |  | Cumulative credits | from STU.CR |
| current_year_credits | money | yes | Current year credits |  |
| failing_grade_count | int | yes | Failing grade count |  |
| at_risk_grade_count | int | yes | At-risk grade count |  |
| honor_grade_count | int | yes | Honor grade count |  |
| academic_standing | varchar(18) |  | Academic standing |  |
| academic_risk_level | varchar(13) |  | Academic risk level |  |
