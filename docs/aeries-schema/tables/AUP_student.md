# AUP_student (view)


Primary key: (none declared) · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  |  | from STU.ID |
| first_name | nvarchar(100) |  |  | from STU.FN |
| last_name | nvarchar(100) |  |  | from STU.LN |
| grade_level | int |  |  |  |
| email_address | varchar(59) | yes |  |  |
| USERNAME | varchar(50) | yes |  | from SUP.UN |
| PASSWORD | varchar(8000) | yes |  |  |
| school_name | nvarchar(60) | yes |  | from LOC.NM |
| TEACHER NAME (OPTIONAL | varchar(1) |  |  |  |
| TEACHER NUMBER (OPTIONAL) | varchar(1) |  |  |  |
