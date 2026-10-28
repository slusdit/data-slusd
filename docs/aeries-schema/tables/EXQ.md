# EXQ

Aeries Web Only. Aeries Analytics Table for Exam Questions.

Rows: 0 · Primary key: EID, QID · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → EXM.EID |
| QID | smallint |  |  |  |
| TXT | nvarchar(max) |  |  |  |
| AA | nvarchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| GP | nvarchar(255) |  |  |  |
| WT | money |  |  |  |
| BID | nvarchar(255) |  |  |  |
| TY | varchar(1) |  |  |  |
| VN | varchar(5) |  |  |  |
| CDT | datetime | yes |  |  |
| MDT | datetime | yes |  |  |
| DL | nvarchar(255) |  |  |  |
| TID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXM**: EXQ.EID = EXM.EID

## Referenced by (declared FKs)

- **ESR**: ESR.EID = EXQ.EID AND ESR.QID = EXQ.QID
- **EXC**: EXC.EID = EXQ.EID AND EXC.QID = EXQ.QID
- **EXS**: EXS.EID = EXQ.EID AND EXS.QID = EXQ.QID
- **EXV**: EXV.EID = EXQ.EID AND EXV.QID = EXQ.QID
