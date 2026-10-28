# EFB


Rows: 0 · Primary key: BID · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| BID | int |  |  |  |
| CID | int |  |  | FK → EFO.CID |
| TY | varchar(20) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| EXB | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EFO**: EFB.CID = EFO.CID

## Referenced by (declared FKs)

- **EFJ**: EFJ.BID = EFB.BID
