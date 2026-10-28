# EFR

Ed-Fi Results

Rows: 0 · Primary key: TID · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TID | varchar(255) |  |  |  |
| CID | int |  |  |  |
| NM | nvarchar(255) |  |  |  |
| ST | nvarchar(255) |  |  |  |
| RS | nvarchar(max) |  |  |  |
| PC | money |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **EdFiTransactionErrors**: EdFiTransactionErrors.TID = EFR.TID
