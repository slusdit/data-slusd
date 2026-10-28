# SLUSD_Secondary_NoShow_status (view)


Primary key: (none declared) · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| sch# | smallint |  |  | from STU.SC |
| School | varchar(30) | yes |  |  |
| Last | nvarchar(100) |  |  | from STU.LN |
| First | nvarchar(100) |  |  | from STU.FN |
| PermID | int |  |  | from STU.ID |
| Grade | smallint |  |  | from STU.GR |
| Number of Days Enrolled | int | yes |  |  |
| Number of Absences | int | yes |  |  |
| No Show Status | varchar(7) |  |  |  |
