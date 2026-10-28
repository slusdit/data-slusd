# CLEVER_SCHOOLS (view)


Primary key: (none declared) · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| School_id | varchar(30) | yes |  |  |
| School_name | varchar(30) | yes |  |  |
| State_id | varchar(30) | yes |  |  |
| Low_grade | varchar(30) | yes |  |  |
| High_grade | varchar(30) | yes |  |  |
| Principal | varchar(30) | yes |  |  |
| Principal_email | varchar(30) | yes |  |  |
| School_address | varchar(55) |  |  | from CLEVER_SCHOOLS.School_address |
| School_city | varchar(30) |  |  | from CLEVER_SCHOOLS.School_city |
| School_state | varchar(12) |  |  | from CLEVER_SCHOOLS.School_state |
| School_zip | varchar(30) | yes |  |  |
| School_phone | varchar(60) | yes |  |  |
