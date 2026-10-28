# TFL

Aeries Web Only. Contains the files uploaded by teachers to link with Aeries Web Gradebook Assignments.

Rows: 1,947 · Primary key: FID · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| FID | int |  |  |  |
| NM | varchar(255) |  |  |  |
| SZ | int |  |  |  |
| TY | varchar(255) |  |  |  |
| UN | varchar(255) |  |  |  |
| SID | int |  |  |  |
| DOC | varbinary(max) | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **GBF**: GBF.FID = TFL.FID
