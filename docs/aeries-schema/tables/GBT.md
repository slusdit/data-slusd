# GBT

Contains definitions of the various assignment types by teachers

Rows: 4,087 · Primary key: GN, AT · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GN | int |  |  | FK → GBK.GN |
| AT | varchar(1) |  |  |  |
| TD | nvarchar(255) |  |  |  |
| PG | smallint |  |  |  |
| CL | varchar(6) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBK**: GBT.GN = GBK.GN
