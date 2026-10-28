# EXT

Aeries Web Only. Aeries Analytics Table for Exam Passage Text.

Rows: 0 · Primary key: TID · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TID | int |  |  |  |
| BID | nvarchar(255) |  |  |  |
| TY | smallint |  |  |  |
| VN | varchar(5) |  |  |  |
| TT | nvarchar(255) |  |  |  |
| ST | nvarchar(255) |  |  |  |
| TXT | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **EXG**: EXG.TID = EXT.TID
