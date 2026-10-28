# OBC

Observation Codes

Rows: 0 · Primary key: CD · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CD | varchar(15) |  |  |  |
| OTY | varchar(15) |  |  |  |
| TY | varchar(2) |  |  |  |
| DE | varchar(max) |  |  |  |
| CL1 | varchar(2) |  |  |  |
| DE1 | nvarchar(255) |  |  |  |
| CL2 | varchar(2) |  |  |  |
| DE2 | nvarchar(255) |  |  |  |
| CL3 | varchar(2) |  |  |  |
| DE3 | nvarchar(255) |  |  |  |
| CL4 | varchar(2) |  |  |  |
| DE4 | nvarchar(255) |  |  |  |
| CL5 | varchar(2) |  |  |  |
| DE5 | nvarchar(255) |  |  |  |
| CL6 | varchar(2) |  |  |  |
| DE6 | nvarchar(255) |  |  |  |
| UPG | int |  |  |  |
| VPG | int |  |  |  |
| TG | varchar(1) |  |  |  |
| SD | varchar(20) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **OBO**: OBO.CD = OBC.CD
- **OBS**: OBS.CD = OBC.CD
