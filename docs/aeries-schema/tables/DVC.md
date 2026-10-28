# DVC

Data Validation Schools

Rows: 249 · Primary key: GID, SCL · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GID | int |  |  | FK → DVG.GID |
| SCL | smallint |  |  |  |
| LC | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DVG**: DVC.GID = DVG.GID
