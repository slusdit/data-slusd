# SGD

Stores the definition of Student Groups

Rows: 365 · Primary key: GI · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GI | int |  |  |  |
| GN | varchar(60) |  |  |  |
| GD | varchar(255) |  |  |  |
| NM | varchar(255) |  |  |  |
| VA | bit |  |  |  |
| DT | datetime | yes |  |  |
| DX | datetime | yes |  |  |
| SCL | smallint |  |  |  |
| CM | bit |  |  |  |
| DG | bit |  |  |  |
| DGT | nvarchar(6) |  |  |  |
| FC | nvarchar(6) |  |  |  |
| VL | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| CG | bit |  |  |  |

## Referenced by (declared FKs)

- **SGM**: SGM.GI = SGD.GI
- **SGS**: SGS.GI = SGD.GI
