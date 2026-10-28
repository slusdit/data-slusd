# PDR

Holds the Document Requests

Rows: 0 · Primary key: FID · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| FID | int |  |  |  |
| TI | nvarchar(255) |  |  |  |
| DE | nvarchar(max) |  |  |  |
| CT | nvarchar(3) |  |  |  |
| SCT | nvarchar(3) |  |  |  |
| TY | nvarchar(4) |  |  |  |
| RQ | bit |  |  |  |
| SO | int |  |  |  |
| DT | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **PDT**: PDT.FID = PDR.FID
