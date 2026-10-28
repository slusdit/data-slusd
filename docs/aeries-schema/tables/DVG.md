# DVG

Data Validation Groups

Rows: 14 · Primary key: GID · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GID | int |  |  |  |
| NM | varchar(50) |  |  |  |
| DE | nvarchar(255) |  |  |  |
| VS | varchar(1) |  |  |  |
| SA | varchar(100) |  |  |  |
| DS | bit |  |  |  |
| LC | int |  |  |  |
| UI | varchar(36) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **DVC**: DVC.GID = DVG.GID
- **DVU**: DVU.GID = DVG.GID
