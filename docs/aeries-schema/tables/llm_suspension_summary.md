# llm_suspension_summary (view)


Primary key: (none declared) · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| student_id | int |  | Student identifier | from ADS.PID |
| school_id | smallint | yes | School code | from STU.SC |
| student_number | int | yes | Student number | from STU.SN |
| last_name | nvarchar(100) | yes | Last name | from STU.LN |
| first_name | nvarchar(100) | yes | First name | from STU.FN |
| grade_level | smallint | yes | Grade level | from STU.GR |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| out_of_school_suspensions | int | yes | Out-of-school suspensions |  |
| in_school_suspensions | int | yes | In-school suspensions |  |
| total_suspensions | int | yes | Total suspensions |  |
| expulsions | int | yes | Expulsions |  |
| most_recent_suspension_date | date | yes | Most recent suspension date |  |
| first_suspension_date | date | yes | First suspension date |  |
| days_since_last_suspension | int | yes | Days since last suspension |  |
| discipline_risk_level | varchar(9) |  | Discipline risk level |  |
