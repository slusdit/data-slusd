# schoology_users (view)


Primary key: (none declared) · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| First Name | nvarchar(100) |  |  | from SCHOOLOGY_USERS.First Name |
| Last Name | nvarchar(100) |  |  | from SCHOOLOGY_USERS.Last Name |
| Username | varchar(255) | yes |  | from SCHOOLOGY_USERS.Username |
| Email | varchar(264) |  |  |  |
| Unique User ID | varchar(34) | yes |  |  |
| Role | varchar(7) |  |  |  |
| School | smallint |  |  | from SCHOOLOGY_USERS.School |
