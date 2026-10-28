# IMJ


Rows: 66 · Primary key: GUID · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GUID | nvarchar(255) |  |  |  |
| TBL | nvarchar(55) |  |  |  |
| CLM | nvarchar(max) |  |  |  |
| UPD | bit |  |  |  |
| IST | bit |  |  |  |
| ISC | bit |  |  |  |
| DS | datetime | yes |  |  |
| DE | datetime | yes |  |  |
| UN | nvarchar(55) |  |  |  |
| YR | smallint |  |  |  |
| TLO | nvarchar(255) |  |  |  |
| IMD | nvarchar(55) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **IMR**: IMR.GUID = IMJ.GUID
