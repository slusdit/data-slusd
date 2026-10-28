# DVD

Data Validation Definitions

Rows: 45 · Primary key: VID · Columns: 25

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| VID | int |  |  |  |
| GID | int |  |  |  |
| NM | varchar(50) |  |  |  |
| DE | nvarchar(255) |  |  |  |
| QD | nvarchar(max) |  |  |  |
| KY1 | varchar(30) |  |  |  |
| KY2 | varchar(30) |  |  |  |
| SV | varchar(3) |  |  | COD DVD.SV (2 codes) |
| PC | nvarchar(max) |  |  |  |
| PS | nvarchar(max) |  |  |  |
| PG1 | varchar(100) |  |  |  |
| PG2 | varchar(100) |  |  |  |
| SR | bit |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DS | bit |  |  |  |
| LR | datetime | yes |  |  |
| LC | int |  |  |  |
| DT1 | datetime | yes |  |  |
| DT2 | datetime | yes |  |  |
| LT | int |  |  |  |
| UR | bit |  |  |  |
| UI | varchar(36) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **DVR**: DVR.VID = DVD.VID
