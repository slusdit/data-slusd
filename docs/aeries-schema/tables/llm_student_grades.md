# llm_student_grades (view)


Primary key: (none declared) · Columns: 31

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from GRD.SID |
| school_id | smallint |  | School code | from GRD.SC |
| student_number | int |  | Student number | from GRD.SN |
| section_number | smallint |  | Section number | from GRD.SE |
| course_number | varchar(6) |  | Course number | from GRD.CN |
| period | smallint |  | Period | from GRD.PD |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| course_name | nvarchar(30) | yes | Course name | from CRS.CO |
| course_description | varchar(255) | yes | Course description | from CRS.DE |
| department_name | nvarchar(max) | yes | Department name | from COD.DE |
| teacher_last_name | nvarchar(50) | yes | Teacher last name |  |
| teacher_first_name | varchar(20) | yes | Teacher first name | from STF.FN |
| final_grade | nvarchar(3) |  | Final grade | from GRD.MK |
| credits_earned | money |  | Credits earned | from GRD.CR |
| mark_1 | nvarchar(3) |  | Mark period 1 | from GRD.M1 |
| mark_2 | nvarchar(3) |  | Mark period 2 | from GRD.M2 |
| mark_3 | nvarchar(3) |  | Mark period 3 | from GRD.M3 |
| mark_4 | nvarchar(3) |  | Mark period 4 | from GRD.M4 |
| mark_5 | nvarchar(3) |  | Mark period 5 | from GRD.M5 |
| mark_6 | nvarchar(3) |  | Mark period 6 | from GRD.M6 |
| citizenship_1 | nvarchar(2) |  | Citizenship period 1 | from GRD.C1 |
| citizenship_2 | nvarchar(2) |  | Citizenship period 2 | from GRD.C2 |
| citizenship_3 | nvarchar(2) |  | Citizenship period 3 | from GRD.C3 |
| citizenship_indicator | nvarchar(1) |  | Citizenship indicator | from GRD.CI |
| grade_comments | nvarchar(max) |  | Grade comments | from GRD.CO |
| is_failing | int |  | Is failing (1/0) |  |
| is_honor_grade | int |  | Is honor grade (1/0) |  |
| is_at_risk | int |  | Is at risk (1/0) |  |
