# EXC

Aeries Web Only. Aeries Analytics Table for Exam Question Choices.

Rows: 0 · Primary key: EID, QID, SQ · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → EXQ.EID |
| QID | smallint |  |  | FK → EXQ.QID |
| SQ | smallint |  |  |  |
| LBL | nvarchar(1) |  |  |  |
| BID | nvarchar(255) |  |  |  |
| CR | bit |  |  |  |
| TXT | nvarchar(max) |  |  |  |
| RTN | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXQ**: EXC.EID = EXQ.EID AND EXC.QID = EXQ.QID
