# llm_frpm_status (view)


Primary key: (none declared) · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from FRE.ID |
| school_id | smallint | yes | School code | from STU.SC |
| student_number | int | yes | Student number | from STU.SN |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| frpm_code | varchar(1) |  | FRPM code | from FRE.FC |
| frpm_status | varchar(12) |  | FRPM status (Free/Reduced/Paid) |  |
| eligibility_code | varchar(1) |  | Eligibility code | from FRE.CD |
| eligibility_method | nvarchar(max) | yes | Eligibility method | from COD.DE |
| effective_start_date | datetime | yes | Effective start date | from FRE.ESD |
| is_frpm_eligible | int |  | Is FRPM eligible (1/0) |  |
| is_free | int |  | Is free (1/0) |  |
| is_reduced | int |  | Is reduced (1/0) |  |
