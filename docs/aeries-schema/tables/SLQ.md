# SLQ

Service Learning Org. Areas

Rows: 0 · Primary key: OID, CD · Columns: 4

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| OID | varchar(255) |  |  | FK → SLO.OID |
| CD | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SLO**: SLQ.OID = SLO.OID
