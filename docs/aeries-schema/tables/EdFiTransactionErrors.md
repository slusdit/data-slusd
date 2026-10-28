# EdFiTransactionErrors


Rows: 0 · Primary key: TID, PK · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TID | varchar(255) |  |  | FK → EFR.TID |
| PK | varchar(64) |  |  |  |
| ENM | varchar(255) |  |  |  |
| RPK | nvarchar(max) |  |  |  |
| RID | varchar(255) |  |  |  |
| RQJ | nvarchar(max) |  |  |  |
| RES | nvarchar(max) |  |  |  |
| EC | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EFR**: EdFiTransactionErrors.TID = EFR.TID
