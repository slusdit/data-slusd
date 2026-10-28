# UAO

Contains User Account Options for use with Google Classrooms.

Rows: 21,773 · Primary key: UID, NM · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| UID | int |  |  | FK → UGN.UID |
| NM | varchar(255) |  |  |  |
| OV | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **UGN**: UAO.UID = UGN.UID
