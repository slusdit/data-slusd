# EFSD


Rows: 0 · Primary key: CID · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CID | int |  |  | FK → EFO.CID |
| DOW | varchar(7) |  |  |  |
| TM | datetime | yes |  |  |
| NS | bit |  |  |  |
| RTS | bit |  |  |  |
| EM | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EFO**: EFSD.CID = EFO.CID
