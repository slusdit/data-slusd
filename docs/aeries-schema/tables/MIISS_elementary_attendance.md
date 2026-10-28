# MIISS_elementary_attendance (view)


Primary key: (none declared) · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | from ABS.SC |
| ID | int |  |  | from STU.ID |
| Period | varchar(7) |  |  |  |
| DT | datetime | yes |  | from ATT.DT |
| Code | varchar(1) |  |  | from ATT.AL |
| Code Type | varchar(11) |  |  |  |
