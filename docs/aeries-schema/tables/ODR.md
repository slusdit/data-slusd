# ODR

Digital Store Order

Rows: 0 · Primary key: ODN · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ODN | int |  |  |  |
| UID | int |  |  |  |
| DT | datetime | yes |  |  |
| ST | varchar(50) |  |  |  |
| INM | nvarchar(max) |  |  |  |
| EXM | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **OHI**: OHI.ODN = ODR.ODN
