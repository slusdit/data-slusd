# GBR

Stores terms associated with each gradebook.

Rows: 2,202 · Primary key: GN, CD · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GN | int |  |  | FK → GBK.GN |
| CD | varchar(1) |  |  |  |
| NM | nvarchar(255) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBK**: GBR.GN = GBK.GN

## Referenced by (declared FKs)

- **GBV**: GBV.GN = GBR.GN AND GBV.CD = GBR.CD
