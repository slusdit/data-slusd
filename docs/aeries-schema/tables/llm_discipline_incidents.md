# llm_discipline_incidents (view)


Primary key: (none declared) · Columns: 29

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from ADS.PID |
| sequence_number | smallint |  | Sequence number | from ADS.SQ |
| school_id | smallint | yes | School code | from STU.SC |
| student_number | int | yes | Student number | from STU.SN |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| incident_school_code | smallint |  | Incident school code | from ADS.SCL |
| incident_school_name | nvarchar(60) | yes | Incident school name | from LOC.NM |
| incident_date | date | yes | Incident date |  |
| primary_discipline_code | varchar(2) |  | Primary discipline code | from ADS.CD |
| primary_discipline_description | nvarchar(max) | yes | Primary discipline description | from COD.DE |
| secondary_code_1 | varchar(2) |  | Secondary code 1 | from ADS.CD2 |
| secondary_description_1 | nvarchar(max) | yes | Secondary description 1 | from COD.DE |
| secondary_code_2 | varchar(2) |  | Secondary code 2 | from ADS.CD3 |
| secondary_description_2 | nvarchar(max) | yes | Secondary description 2 | from COD.DE |
| secondary_code_3 | varchar(2) |  | Secondary code 3 | from ADS.CD4 |
| secondary_description_3 | nvarchar(max) | yes | Secondary description 3 | from COD.DE |
| secondary_code_4 | varchar(2) |  | Secondary code 4 | from ADS.CD5 |
| secondary_description_4 | nvarchar(max) | yes | Secondary description 4 | from COD.DE |
| incident_comment | nvarchar(max) |  | Incident comment | from ADS.CO |
| disposition_code | varchar(20) | yes | Disposition code | from DSP.DS |
| disposition_description | nvarchar(max) | yes | Disposition description | from COD.DE |
| discipline_category | varchar(24) |  | Discipline category |  |
| is_out_of_school_suspension | int |  | Is OSS (1/0) |  |
| is_in_school_suspension | int |  | Is ISS (1/0) |  |
| is_expulsion | int |  | Is expulsion (1/0) |  |
| is_suspension | int |  | Is suspension (1/0) |  |
| school_year_start | int | yes | School year start |  |
