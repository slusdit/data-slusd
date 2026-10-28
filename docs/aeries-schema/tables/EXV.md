# EXV

Aeries Web Only. Aeries Analytics Table for Exam Versions.

Rows: 0 · Primary key: EID, QID, VN · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → EXQ.EID |
| QID | smallint |  |  | FK → EXQ.QID |
| VN | varchar(1) |  |  |  |
| QN | smallint |  |  |  |
| ANS | nvarchar(255) |  |  |  |
| BID | nvarchar(255) |  |  |  |
| LBL | varchar(5) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXQ**: EXV.EID = EXQ.EID AND EXV.QID = EXQ.QID
