# OBD


Rows: 0 · Primary key: OTY · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| OTY | varchar(15) |  |  |  |
| TI | varchar(100) |  |  |  |
| DE | varchar(max) |  |  |  |
| NO | bit |  |  |  |
| RF | bit |  |  |  |
| CM | bit |  |  |  |
| RSG | varchar(255) |  |  |  |
| RD | varchar(255) |  |  |  |
| TG | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **OBL**: OBL.OTY = OBD.OTY
- **OBT**: OBT.OTY = OBD.OTY
