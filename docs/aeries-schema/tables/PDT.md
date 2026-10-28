# PDT

Holds the Translations by CL for Document Requests

Rows: 0 · Primary key: FID, CL · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| FID | int |  |  | FK → PDR.FID |
| CL | varchar(2) |  |  |  |
| TI | nvarchar(255) |  |  |  |
| DE | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **PDR**: PDT.FID = PDR.FID
