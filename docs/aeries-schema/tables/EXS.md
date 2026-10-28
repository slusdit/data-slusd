# EXS

Aeries Web Only. Aeries Analytics Table for Exam Question Standards.

Rows: 0 · Primary key: EID, QID, SD · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → EXQ.EID |
| QID | smallint |  |  | FK → EXQ.QID |
| SD | varchar(20) |  |  |  |
| BID | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXQ**: EXS.EID = EXQ.EID AND EXS.QID = EXQ.QID
