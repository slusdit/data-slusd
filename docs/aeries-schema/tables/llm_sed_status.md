# llm_sed_status (view)


Primary key: (none declared) · Columns: 14

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
| frpm_code | varchar(1) | yes | FRPM code | from FRE.FC |
| is_frpm_eligible | int |  | Is FRPM eligible (1/0) |  |
| lowest_parent_education_level | varchar(2) | yes | Lowest parent education level | from CON.ELV |
| has_low_parent_education | int |  | Has low parent education (1/0) |  |
| direct_certification_flag | varchar(2) |  | Direct certification flag | from STU.PED |
| is_sed | int |  | Is SED (1/0) |  |
| sed_reason | varchar(22) |  | SED reason |  |
