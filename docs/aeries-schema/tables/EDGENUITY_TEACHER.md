# EDGENUITY_TEACHER (view)


Primary key: (none declared) · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| External User ID | int |  |  | from TCH.ID |
| Username | varchar(8000) | yes |  |  |
| SchoolID | varchar(1) |  |  |  |
| Last | varchar(50) |  |  | from TCH.TLN |
| First | nvarchar(20) |  |  | from TCH.TF |
| Middle | varchar(1) |  |  |  |
| Password | varchar(37) | yes |  |  |
| Email | varchar(255) | yes |  |  |
