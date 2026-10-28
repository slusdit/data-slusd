# SGA

Student Group Analytics

Rows: 30 · Primary key: AID, GI, LVL · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GI | int |  |  |  |
| AID | varchar(255) |  |  | FK → DAI.AID |
| LVL | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DAI**: SGA.AID = DAI.AID
