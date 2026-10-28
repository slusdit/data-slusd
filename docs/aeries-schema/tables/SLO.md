# SLO

Aeries Web Only. Contains information about organizations that students can donate their time to for building Service Learning Hours.

Rows: 0 · Primary key: OID · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| OID | varchar(255) |  |  |  |
| NM | varchar(255) |  |  |  |
| AD | varchar(55) |  |  |  |
| CY | varchar(30) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| SNM | varchar(255) |  |  |  |
| TL | varchar(255) |  |  |  |
| EM | varchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| TG | varchar(3) |  |  |  |
| WS | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **SLQ**: SLQ.OID = SLO.OID
