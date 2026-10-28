# DRT

Aeries Web Only. Contains information about district resources including title and other basic information

Rows: 2 · Primary key: RID · Columns: 36

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | int |  |  |  |
| TI | varchar(60) |  |  |  |
| AU | varchar(50) |  |  |  |
| ED | varchar(4) |  |  |  |
| CP | smallint |  |  |  |
| AV | smallint |  |  | COD DRT.AV (2 codes) |
| FC | smallint |  |  |  |
| LC | smallint |  |  |  |
| PR | money |  |  |  |
| DP | varchar(2) |  |  |  |
| PB | varchar(50) |  |  |  |
| CR | varchar(4) |  |  |  |
| AD | datetime | yes |  |  |
| VN | int |  |  |  |
| CT | varchar(10) |  |  |  |
| RC | money |  |  |  |
| LB | varchar(16) |  |  |  |
| IS | varchar(13) |  |  |  |
| D1 | money |  |  |  |
| D2 | money |  |  |  |
| D3 | money |  |  |  |
| D4 | money |  |  |  |
| C1 | varchar(2) |  |  |  |
| C2 | varchar(2) |  |  |  |
| C3 | varchar(2) |  |  |  |
| U1 | varchar(3) |  |  |  |
| U2 | varchar(3) |  |  |  |
| U3 | varchar(3) |  |  |  |
| U4 | varchar(3) |  |  |  |
| U5 | varchar(3) |  |  |  |
| U6 | varchar(3) |  |  |  |
| U7 | varchar(3) |  |  |  |
| U8 | varchar(3) |  |  |  |
| TY | varchar(3) |  |  | COD DRT.TY (2 codes) |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **DRC**: DRC.RID = DRT.RID
- **DRI**: DRI.RID = DRT.RID
