# OBO


Rows: 0 · Primary key: TSQ, CD · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TSQ | int |  |  |  |
| CD | varchar(15) |  |  | FK → OBC.CD |
| CM | bit |  |  |  |
| PT | smallint |  |  |  |
| LV | smallint |  |  |  |
| DG | varchar(6) |  |  |  |
| SA | varchar(6) |  |  |  |
| NO | bit |  |  |  |
| TG | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **OBC**: OBO.CD = OBC.CD
