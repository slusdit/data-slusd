# AUP_Teacher (view)


Primary key: (none declared) · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| LAST NAME | varchar(50) |  |  | from TCH.TLN |
| FIRST NAME | nvarchar(20) |  |  | from TCH.TF |
| EMAIL ADDRESS (RECOMMENDED - OPTIONAL IF USENAME PROVIDED) | varchar(255) |  |  | from TCH.EM |
| Username (Optional if email provided) | varchar(8000) | yes |  |  |
| PASSWORD | varchar(7) |  |  |  |
| SCHOOL NAME (OPTIONAL) | nvarchar(60) | yes |  | from LOC.NM |
| TEACHER NUMBER | varchar(61) | yes |  |  |
