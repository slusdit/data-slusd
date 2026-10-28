# CPR

This table is in the Aeries SQL database for a planned future enhancement to Aeries to implement Course Requests

Rows: 0 · Primary key: CN, RID, CNR · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CN | varchar(6) |  |  | FK → CRS.CN |
| RID | int |  |  |  |
| CNR | varchar(6) |  |  |  |
| CR | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: CPR.CN = CRS.CN
- inferred → **CRS**: CPR.CN = CRS.CN (course number)
