# llm_special_programs (view)


Primary key: (none declared) · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from PGM.PID |
| school_id | smallint | yes | School code | from STU.SC |
| student_number | int | yes | Student number | from STU.SN |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| program_code | varchar(3) |  | Program code | from PGM.CD |
| program_description | nvarchar(max) | yes | Program description | from COD.DE |
| program_category | varchar(15) |  | Program category |  |
| program_start_date | datetime | yes | Program start date | from PGM.PSD |
| program_end_date | datetime | yes | Program end date | from PGM.PED |
| eligibility_start_date | datetime | yes | Eligibility start date | from PGM.ESD |
| eligibility_end_date | datetime | yes | Eligibility end date | from PGM.EED |
| is_active | int |  | Is active (1/0) |  |
| status | varchar(16) |  | Status |  |
