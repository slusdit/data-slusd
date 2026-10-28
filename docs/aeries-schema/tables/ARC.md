# ARC

Stores At-Risk Indicator information

Rows: 0 · Primary key: UID · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| UID | int |  |  |  |
| CD | nvarchar(6) |  |  |  |
| SDE | nvarchar(30) |  |  |  |
| DE | nvarchar(max) |  |  |  |
| AMI | bit |  |  |  |
| UF | nvarchar(1) |  |  |  |
| AID | varchar(255) |  |  |  |
| LAR | varchar(20) |  |  |  |
| ST | nvarchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **ARI**: ARI.IID = ARC.UID
