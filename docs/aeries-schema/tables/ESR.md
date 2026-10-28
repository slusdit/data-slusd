# ESR

Contains grading rules for each exam question.

Rows: 0 · Primary key: EID, QID, RN · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → EXQ.EID |
| QID | smallint |  |  | FK → EXQ.QID |
| RN | smallint |  |  |  |
| RL | varchar(5) |  |  |  |
| RV | varchar(255) |  |  |  |
| WT | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXQ**: ESR.EID = EXQ.EID AND ESR.QID = EXQ.QID
