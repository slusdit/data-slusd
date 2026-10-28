# GEA

Stores requirements for an Endorsement

Rows: 0 · Primary key: EPI, RN · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EPI | int |  |  | FK → GEP.EPI |
| RN | smallint |  |  |  |
| DE | varchar(max) |  |  |  |
| LCH | varchar(9) |  |  |  |
| HCH | varchar(9) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GEP**: GEA.EPI = GEP.EPI

## Referenced by (declared FKs)

- **GEO**: GEO.EPI = GEA.EPI AND GEO.RN = GEA.RN
