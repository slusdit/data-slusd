# llm_elpac_scores (view)


Primary key: (none declared) · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from TST.PID |
| school_id | smallint | yes | School code | from STU.SC |
| student_number | int | yes | Student number | from STU.SN |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| language_fluency_code | varchar(1) | yes | Language fluency code | from STU.LF |
| language_fluency | nvarchar(max) | yes | Language fluency description | from COD.DE |
| is_english_learner | varchar(4) |  | Is English Learner (1/0) |  |
| test_code | varchar(8) |  | Test code | from TST.ID |
| test_date | datetime | yes | Test date | from TST.TD |
| test_year | int | yes | Test year |  |
| performance_level | money |  | Performance level | from TST.PL |
| scale_score | smallint |  | Scale score | from TST.SS |
| elpac_level_description | varchar(20) | yes | ELPAC level description |  |
| is_newcomer_el | varchar(3) |  | Is newcomer EL (1/0) |  |
| is_long_term_el | varchar(3) |  | Is long-term EL (1/0) |  |
| us_school_entry_date | datetime | yes | US school entry date | from LAC.USS |
| us_entry_date | datetime | yes | US entry date | from LAC.USE |
| birth_country | varchar(2) | yes | Birth country | from STU.BCU |
| years_in_us_schools | int | yes | Years in US schools |  |
