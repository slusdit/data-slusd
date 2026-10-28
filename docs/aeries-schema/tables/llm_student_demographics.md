# llm_student_demographics (view)


Primary key: (none declared) · Columns: 57

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Unique student identifier | from STU.ID |
| state_student_id | varchar(10) |  | State-assigned student ID | from STU.CID |
| student_number | int |  | District student number | from STU.SN |
| school_id | smallint |  | School code | from STU.SC |
| last_name | nvarchar(100) |  | Student last name | from STU.LN |
| first_name | nvarchar(100) |  | Student first name | from STU.FN |
| middle_name | nvarchar(100) |  | Student middle name | from STU.MN |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| grade_level | smallint |  | Current grade level | from STU.GR |
| birth_date | date | yes | Date of birth |  |
| age | int | yes | Current age |  |
| gender | varchar(1) |  | Gender | from STU.SX |
| address | varchar(55) |  | Street address | from STU.AD |
| city | varchar(30) |  | City | from STU.CY |
| state | varchar(2) |  | State | from STU.ST |
| zip_code | varchar(5) |  | ZIP code | from STU.ZC |
| home_phone | varchar(10) |  | Home phone number | from STU.TL |
| parent_guardian_name | nvarchar(50) |  | Parent/guardian name | from STU.PG |
| parent_email | varchar(255) |  | Parent email | from STU.PEM |
| student_email | varchar(255) |  | Student email | from STU.SEM |
| home_language_code | varchar(2) |  | Home language code | from STU.HL |
| home_language | nvarchar(max) | yes | Home language description | from COD.DE |
| correspondence_language_code | varchar(2) |  | Correspondence language code | from STU.CL |
| correspondence_language | nvarchar(max) | yes | Correspondence language description | from COD.DE |
| language_fluency_code | varchar(1) |  | Language fluency code | from STU.LF |
| language_fluency | nvarchar(max) | yes | Language fluency description | from COD.DE |
| english_learner_status | varchar(7) |  | EL status (Y/N) |  |
| ethnicity_code | varchar(1) |  | Ethnicity code | from STU.ETH |
| ethnicity | nvarchar(max) | yes | Ethnicity description | from COD.DE |
| race_code_1 | varchar(3) |  | Primary race code | from STU.RC1 |
| race_1 | nvarchar(max) | yes | Primary race description | from COD.DE |
| race_code_2 | varchar(3) |  | Secondary race code | from STU.RC2 |
| race_2 | nvarchar(max) | yes | Secondary race description | from COD.DE |
| race_code_3 | varchar(3) |  | Tertiary race code | from STU.RC3 |
| race_3 | nvarchar(max) | yes | Tertiary race description | from COD.DE |
| race_code_4 | varchar(3) |  | Fourth race code | from STU.RC4 |
| race_4 | nvarchar(max) | yes | Fourth race description | from COD.DE |
| race_code_5 | varchar(3) |  | Fifth race code | from STU.RC5 |
| race_5 | nvarchar(max) | yes | Fifth race description | from COD.DE |
| primary_race_ethnicity | nvarchar(max) | yes | Primary race/ethnicity |  |
| birth_country_code | varchar(2) |  | Birth country code | from STU.BCU |
| birth_city | varchar(30) |  | Birth city | from STU.BCY |
| birth_state | varchar(3) |  | Birth state | from STU.BST |
| counselor_email | nvarchar(30) | yes | Counselor email |  |
| counselor_name | varchar(50) | yes | Counselor name |  |
| student_status_code | varchar(1) |  | Student status code | from STU.TG |
| student_status | nvarchar(max) | yes | Student status description | from COD.DE |
| special_program_status | varchar(1) |  | Special program status | from STU.SP |
| entry_date | datetime | yes | School entry date | from STU.ED |
| leave_date | datetime | yes | School leave date | from STU.LD |
| interdistrict_transfer_code | varchar(2) |  | Inter-district transfer code | from STU.IT |
| interdistrict_transfer_district | varchar(14) |  | Transfer district | from STU.ITD |
| custom_field_u11 | varchar(2) |  | Custom field | from STU.U11 |
| days_absent_ytd | smallint |  | Days absent year-to-date | from STU.DA |
| days_enrolled_ytd | smallint |  | Days enrolled year-to-date | from STU.DE |
| days_present_ytd | smallint |  | Days present year-to-date | from STU.DP |
| attendance_rate_ytd | float | yes | Attendance rate year-to-date |  |
