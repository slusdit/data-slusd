# GEO

Stores available options per Endorsement Requirement

Rows: 0 · Primary key: EPI, RN, OID · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EPI | int |  |  | FK → GEA.EPI |
| RN | smallint |  |  | FK → GEA.RN |
| OID | smallint |  |  |  |
| DE | varchar(max) |  |  |  |
| TC | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GEA**: GEO.EPI = GEA.EPI AND GEO.RN = GEA.RN

## Referenced by (declared FKs)

- **GEC**: GEC.EPI = GEO.EPI AND GEC.RN = GEO.RN AND GEC.OID = GEO.OID
