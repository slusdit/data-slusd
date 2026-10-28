# ANA

Stores Attendance Notification Codes.

Rows: 9 · Primary key: NID, CD · Columns: 4

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| NID | int |  |  | FK → ANC.NID |
| CD | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ANC**: ANA.NID = ANC.NID
