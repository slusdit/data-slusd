# ANS

Stores Attendance Notification Schools.

Rows: 20 · Primary key: NID, SCL · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| NID | int |  |  | FK → ANC.NID |
| SCL | smallint |  |  |  |
| DS | bit |  |  |  |
| DL | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ANC**: ANS.NID = ANC.NID
