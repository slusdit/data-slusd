# llm_teacher_courses (view)


Primary key: (none declared) · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| staff_id | int |  | Staff ID | from TCH.ID |
| teacher_number | smallint |  | Teacher number | from TCH.TN |
| school_id | smallint |  | School code | from TCH.SC |
| teacher_last_name | nvarchar(50) | yes | Teacher last name |  |
| teacher_first_name | varchar(20) | yes | Teacher first name | from STF.FN |
| teacher_email | nvarchar(255) |  | Teacher email |  |
| teacher_room | varchar(6) |  | Teacher room | from TCH.RM |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| section_number | smallint | yes | Section number | from MST.SE |
| period | smallint | yes | Period | from MST.PD |
| section_room | varchar(6) | yes | Section room | from MST.RM |
| course_number | varchar(6) | yes | Course number | from MST.CN |
| course_name | nvarchar(30) | yes | Course name | from CRS.CO |
| course_description | varchar(255) | yes | Course description | from CRS.DE |
| department_code | varchar(6) | yes | Department code | from CRS.DC |
| department_name | nvarchar(max) | yes | Department name | from COD.DE |
| schedule_mode | varchar(1) | yes | Schedule mode | from MST.SM |
| schedule_mode_description | varchar(11) | yes | Schedule mode description |  |
| current_enrollment | int | yes | Current enrollment |  |
| credits | money | yes | Credits | from CRS.CR |
| state_course_code | smallint | yes | State course code | from MST.SC |
