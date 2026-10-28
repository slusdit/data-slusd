# llm_test_scores_current (view)


Primary key: (none declared) · Columns: 20

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
| test_code | varchar(8) |  | Test code | from TST.ID |
| test_description | varchar(8) |  | Test description | from TST.ID |
| test_date | datetime | yes | Test date | from TST.TD |
| test_year | int | yes | Test year |  |
| test_category | varchar(6) |  | Test category |  |
| performance_level | money |  | Performance level | from TST.PL |
| scale_score | smallint |  | Scale score | from TST.SS |
| raw_score | smallint |  | Raw score | from TST.RS |
| elpac_level_description | varchar(20) | yes | ELPAC level description |  |
| caaspp_level_description | varchar(19) | yes | CAASPP level description |  |
| part_type | smallint |  | Part type | from TST.PT |
| part_description | varchar(30) | yes | Part description |  |
| grade_at_test | smallint |  | Grade at test | from TST.GR |
