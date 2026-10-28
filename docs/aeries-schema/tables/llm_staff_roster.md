# llm_staff_roster (view)


Primary key: (none declared) · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| staff_id | int |  | Staff ID | from TCH.ID |
| teacher_number | smallint |  | Teacher number | from TCH.TN |
| school_id | smallint |  | School code | from TCH.SC |
| school_name | nvarchar(60) | yes | School name | from LOC.NM |
| last_name | nvarchar(50) | yes | Last name |  |
| first_name | varchar(20) | yes | First name | from STF.FN |
| middle_name | varchar(20) | yes | Middle name | from STF.MN |
| email | nvarchar(255) |  | Email |  |
| room_number | varchar(6) |  | Room number | from TCH.RM |
| low_grade | smallint |  | Low grade | from TCH.LO |
| high_grade | smallint |  | High grade | from TCH.HI |
| grade_range | varchar(68) | yes | Grade range |  |
| custom_field_1 | varchar(3) |  | Custom field 1 | from TCH.U1 |
| custom_field_2 | varchar(3) |  | Custom field 2 | from TCH.U2 |
| teacher_status | varchar(1) |  | Teacher status | from TCH.TG |
| school_level | varchar(10) |  | School level |  |
| sections_taught | int | yes | Sections taught |  |
| total_students | int | yes | Total students |  |
