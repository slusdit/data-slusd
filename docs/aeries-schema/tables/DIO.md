# DIO

Aeries Web Only. Aeries Analytics Dashboard – stores the definition of each dashboard item

Rows: 146 · Primary key: IID · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| IID | int |  |  |  |
| NM | varchar(255) |  |  |  |
| TY | smallint |  |  |  |
| CTY | varchar(10) |  |  |  |
| SCH | nvarchar(max) |  |  |  |
| GR | varchar(255) |  |  |  |
| AID | nvarchar(max) |  |  |  |
| DDO | varchar(50) |  |  |  |
| LTD | varchar(50) |  |  |  |
| LR | varchar(50) |  |  |  |
| DBY | varchar(50) |  |  |  |
| UID | int |  |  |  |
| CS | bit |  |  |  |
| THR | int |  |  |  |
| ITY | varchar(10) |  |  |  |
| SGR | nvarchar(max) |  |  |  |
| SYS | varchar(20) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **DIG**: DIG.IID = DIO.IID
- **DIP**: DIP.IID = DIO.IID
