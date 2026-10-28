# EPK


Rows: 0 · Primary key: PKID · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PKID | int |  |  |  |
| EN | varchar(150) |  |  |  |
| PKH | varchar(64) |  |  |  |
| PKJ | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **EFC**: EFC.PKID = EPK.PKID
- **EFT**: EFT.PKID = EPK.PKID
