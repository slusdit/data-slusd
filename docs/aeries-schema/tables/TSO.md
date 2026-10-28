# TSO

Stores standard grading options by teacher and class.

Rows: 0 · Primary key: SD, CN, SID · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SD | varchar(20) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| SID | int |  |  | FK → STF.ID |
| EFG | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STF**: TSO.SID = STF.ID
- inferred → **CRS**: TSO.CN = CRS.CN (course number)
