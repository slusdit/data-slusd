# DGW

Stores weight factors added to District Defined GPAs

Rows: 0 · Primary key: WF · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| WF | int |  |  |  |
| GID | int |  |  | FK → DGP.GID |
| NM | nvarchar(20) |  |  |  |
| CTY | varchar(3) |  |  |  |
| FC | varchar(6) |  |  |  |
| FV | varchar(255) |  |  |  |
| FVC | varchar(2) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DGP**: DGW.GID = DGP.GID

## Referenced by (declared FKs)

- **DGG**: DGG.WF = DGW.WF
