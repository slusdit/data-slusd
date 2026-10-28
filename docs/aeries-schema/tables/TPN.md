# TPN

Stores Third Party Names.

Rows: 31 · Primary key: PID · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  |  |
| NM | varchar(255) |  |  |  |
| CE | varchar(255) |  |  |  |
| CH | varchar(255) |  |  |  |
| ST | varchar(1) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| ESP | varchar(255) |  |  |  |
| CID | varchar(max) |  |  |  |
| CSK | varchar(max) |  |  |  |
| ORT | bit |  |  |  |
| TY | nvarchar(16) |  |  |  |
| GAD | nvarchar(255) |  |  |  |
| GIS | nvarchar(255) |  |  |  |
| VSD | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **TPO**: TPO.PID = TPN.PID
- **TPP**: TPP.PID = TPN.PID
