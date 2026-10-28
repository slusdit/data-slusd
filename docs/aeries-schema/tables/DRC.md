# DRC

Aeries Web Only. Contains information about courses each district resources applies to

Rows: 0 · Primary key: RID, CN · Columns: 4

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | int |  |  | FK → DRT.RID |
| CN | varchar(6) |  |  | FK → CRS.CN |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: DRC.CN = CRS.CN
- declared FK → **DRT**: DRC.RID = DRT.RID
- inferred → **CRS**: DRC.CN = CRS.CN (course number)
