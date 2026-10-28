# EFF


Rows: 0 · Primary key: JID, PKID · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| JID | int |  |  | FK → EFT.JID |
| PKID | int |  |  | FK → EFT.PKID |
| RQJ | nvarchar(max) |  |  |  |
| RES | nvarchar(max) |  |  |  |
| EC | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EFT**: EFF.JID = EFT.JID AND EFF.PKID = EFT.PKID
