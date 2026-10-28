# llm_student_contacts (view)


Primary key: (none declared) · Columns: 26

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from CON.PID |
| school_id | smallint | yes | School code | from STU.SC |
| student_number | int | yes | Student number | from STU.SN |
| student_last_name | nvarchar(100) | yes | Student last name | from STU.LN |
| student_first_name | nvarchar(100) | yes | Student first name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| contact_sequence | smallint |  | Contact sequence | from CON.SQ |
| contact_first_name | nvarchar(20) |  | Contact first name | from CON.FN |
| contact_last_name | nvarchar(50) |  | Contact last name | from CON.LN |
| relationship_code | varchar(2) |  | Relationship code | from CON.RL |
| relationship | nvarchar(max) | yes | Relationship description | from COD.DE |
| email | varchar(255) |  | Email | from CON.EM |
| home_phone | varchar(10) |  | Home phone | from CON.TL |
| work_phone | varchar(10) |  | Work phone | from CON.WP |
| cell_phone | varchar(10) |  | Cell phone | from CON.CP |
| address | varchar(55) |  | Address | from CON.AD |
| city | varchar(24) |  | City | from CON.CY |
| state | varchar(2) |  | State | from CON.ST |
| zip_code | varchar(5) |  | ZIP code | from CON.ZC |
| is_primary_contact | varchar(1) |  | Is primary contact (1/0) | from CON.PC |
| lives_with_student | varchar(1) |  | Lives with student (1/0) | from CON.LW |
| notification_priority | varchar(1) |  | Notification priority | from CON.NP |
| notification_priority_description | varchar(21) |  | Notification priority description |  |
| education_level_code | varchar(2) |  | Education level code | from CON.ELV |
| education_level | nvarchar(max) | yes | Education level description | from COD.DE |
