# DAG

Aeries Web Only. Define sub groups for district analysis indicators

Rows: 329 · Primary key: AID, LVL · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| AID | varchar(255) |  |  | FK → DAI.AID |
| LVL | smallint |  |  |  |
| DE | nvarchar(255) |  |  |  |
| COR | varchar(20) |  |  |  |
| PCT | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DAI**: DAG.AID = DAI.AID
