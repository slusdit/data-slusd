# GBM

Stores actual Marks used by each Gradebook Grading Scale in the GBC table.

Rows: 322 · Primary key: CID, MK · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CID | int |  |  | FK → GBC.CID |
| MK | nvarchar(20) |  |  |  |
| PM | money |  |  |  |
| LO | money |  |  |  |
| HI | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBC**: GBM.CID = GBC.CID
