# GEC

Stores available courses per Endorsement Option

Rows: 0 · Primary key: EPI, RN, OID, ECR · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EPI | int |  |  | FK → GEO.EPI |
| RN | smallint |  |  | FK → GEO.RN |
| OID | smallint |  |  | FK → GEO.OID |
| ECR | varchar(6) |  |  |  |
| REQ | bit |  |  |  |
| GRP | smallint |  |  |  |
| OCR | money |  |  |  |
| OAG | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GEO**: GEC.EPI = GEO.EPI AND GEC.RN = GEO.RN AND GEC.OID = GEO.OID
