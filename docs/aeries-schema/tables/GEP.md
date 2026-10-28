# GEP

Stores pathways a student can take to achieve the Endorsements

Rows: 0 · Primary key: EPI · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EPI | int |  |  |  |
| EC | nvarchar(6) |  |  |  |
| NM | varchar(255) |  |  |  |
| DE | varchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **GEA**: GEA.EPI = GEP.EPI
