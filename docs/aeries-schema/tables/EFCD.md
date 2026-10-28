# EFCD


Rows: 0 · Primary key: CID, RID, DID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CID | int |  |  | FK → EFC.CID, EFC.CID |
| RID | varchar(36) |  |  | FK → EFC.RID |
| DID | varchar(36) |  |  | FK → EFC.RID |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EFC**: EFCD.CID = EFC.CID AND EFCD.DID = EFC.RID
- declared FK → **EFC**: EFCD.CID = EFC.CID AND EFCD.RID = EFC.RID
