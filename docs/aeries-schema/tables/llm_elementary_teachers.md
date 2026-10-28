# llm_elementary_teachers (view)


Primary key: (none declared) · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| staff_id | int |  | Staff ID | from TCH.ID |
| teacher_number | smallint |  | Teacher number | from TCH.TN |
| school_id | smallint |  | School code | from TCH.SC |
| last_name | nvarchar(50) | yes | Last name |  |
| first_name | varchar(20) | yes | First name | from STF.FN |
| email | nvarchar(255) |  | Email |  |
| room_number | varchar(6) |  | Room number | from TCH.RM |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| low_grade | smallint |  | Low grade | from TCH.LO |
| high_grade | smallint |  | High grade | from TCH.HI |
| grade_range | varchar(67) | yes | Grade range |  |
| homeroom_student_count | int | yes | Homeroom student count |  |
