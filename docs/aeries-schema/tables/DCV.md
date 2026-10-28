# DCV

Table used by Parent Data Confirmation to store the Schools and Grades each document is visible to

Rows: 5 · Primary key: DID · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| DID | varchar(255) |  |  |  |
| SCL | varchar(max) |  |  |  |
| GR | varchar(max) |  |  |  |
| SO | money |  |  |  |
| FG | varchar(3) |  |  |  |
| SR | bit |  |  |  |
| RC | bit |  |  |  |
| AIR | bit |  |  |  |
| CT | varchar(3) |  |  | COD DCV.CT (1 codes) |
| CTY | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **DCS**: DCS.DID = DCV.DID
