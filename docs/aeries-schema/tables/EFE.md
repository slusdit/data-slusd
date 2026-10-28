# EFE

Ed-Fi Entities

Rows: 0 · Primary key: CID, EC · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CID | int |  |  | FK → EFO.CID |
| EC | varchar(100) |  |  |  |
| EN | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EFO**: EFE.CID = EFO.CID
