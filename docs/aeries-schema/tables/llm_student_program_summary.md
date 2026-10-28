# llm_student_program_summary (view)


Primary key: (none declared) · Columns: 18

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
| is_english_learner | int |  | Is English Learner (1/0) |  |
| language_fluency_code | varchar(1) |  | Language fluency code | from STU.LF |
| language_fluency | nvarchar(max) | yes | Language fluency description | from COD.DE |
| is_special_education | int |  | Is Special Education (1/0) |  |
| sped_disability_code | varchar(3) | yes | SPED disability code | from CSE.DI |
| sped_primary_disability | nvarchar(max) | yes | Primary disability description | from COD.DE |
| is_foster_youth | int |  | Is Foster Youth (1/0) |  |
| is_homeless | int |  | Is Homeless (1/0) |  |
| is_migrant | int |  | Is Migrant (1/0) |  |
| is_section_504 | int |  | Is Section 504 (1/0) |  |
| is_in_any_special_program | int |  | Is in any special program (1/0) |  |
