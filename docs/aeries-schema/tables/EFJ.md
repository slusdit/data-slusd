# EFJ


Rows: 0 · Primary key: JID · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| JID | int |  |  |  |
| BID | int |  |  | FK → EFB.BID |
| CID | int |  |  |  |
| EN | varchar(150) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| ST | varchar(50) |  |  |  |
| PC | tinyint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EFB**: EFJ.BID = EFB.BID

## Referenced by (declared FKs)

- **EFJE**: EFJE.JID = EFJ.JID
- **EFT**: EFT.JID = EFJ.JID
