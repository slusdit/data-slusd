# PAO

Contains Portal Account Options for use with Google Classrooms.

Rows: 219,046 · Primary key: AID, NM · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| AID | int |  |  | FK → PWA.AID |
| NM | varchar(255) |  |  |  |
| OV | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **PWA**: PAO.AID = PWA.AID
