# llm_special_education (view)


Primary key: (none declared) · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from CSE.ID |
| school_id | smallint | yes | School code | from STU.SC |
| student_number | int | yes | Student number | from STU.SN |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| sped_status | varchar(6) |  | SPED status |  |
| eligibility_date | datetime | yes | Eligibility date | from CSE.ED |
| exit_date | datetime | yes | Exit date | from CSE.XD |
| placement_code | varchar(3) |  | Placement code | from CSE.PL |
| placement_description | nvarchar(max) | yes | Placement description | from COD.DE |
| primary_disability_code | varchar(3) |  | Primary disability code | from CSE.DI |
| primary_disability | nvarchar(max) | yes | Primary disability description | from COD.DE |
| last_assessment_date | datetime | yes | Last assessment date | from CSE.LA |
| assessment_date | datetime | yes | Assessment date | from CSE.AD |
| review_date | datetime | yes | Review date | from CSE.RD |
| is_active_sped | int |  | Is active SPED (1/0) |  |
