# OBT


Rows: 0 · Primary key: SQ · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SQ | int |  |  |  |
| OTY | varchar(15) |  |  | FK → OBD.OTY |
| TI | varchar(100) |  |  |  |
| DE | varchar(max) |  |  |  |
| TG | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **OBD**: OBT.OTY = OBD.OTY
