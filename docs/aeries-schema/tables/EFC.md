# EFC


Rows: 0 · Primary key: CID, RID · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CID | int |  |  |  |
| RID | varchar(36) |  |  |  |
| PKID | int |  |  | FK → EPK.PKID |
| SCL | smallint |  |  |  |
| EN | varchar(150) |  |  |  |
| RQJ | nvarchar(max) |  |  |  |
| RQH | varchar(128) |  |  |  |
| LMD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EPK**: EFC.PKID = EPK.PKID

## Referenced by (declared FKs)

- **EFCD**: EFCD.CID = EFC.CID AND EFCD.DID = EFC.RID
- **EFCD**: EFCD.CID = EFC.CID AND EFCD.RID = EFC.RID
