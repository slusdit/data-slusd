# UGC

Aeries Web security table for code-based security. Currently used only in specific areas of the system such as Financials.

Rows: 0 · Primary key: UID, TC, FC, CD · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| UID | int |  |  | FK → UGN.UID |
| TC | varchar(4) |  |  |  |
| FC | varchar(4) |  |  |  |
| CD | nvarchar(12) |  |  |  |
| US | smallint |  |  |  |
| VW | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **UGN**: UGC.UID = UGN.UID
