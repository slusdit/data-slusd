# EFT


Rows: 0 · Primary key: JID, PKID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| JID | int |  |  | FK → EFJ.JID |
| PKID | int |  |  | FK → EPK.PKID |
| ST | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EFJ**: EFT.JID = EFJ.JID
- declared FK → **EPK**: EFT.PKID = EPK.PKID

## Referenced by (declared FKs)

- **EFF**: EFF.JID = EFT.JID AND EFF.PKID = EFT.PKID
