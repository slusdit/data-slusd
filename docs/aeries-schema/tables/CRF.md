# CRF

Aeries Web only. Contains fee information specific to each Course.

Rows: 0 · Primary key: CN, SQ · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CN | varchar(6) |  |  | FK → CRS.CN |
| SQ | int |  |  |  |
| TY | varchar(3) |  |  |  |
| DE | nvarchar(255) |  |  |  |
| AM | money |  |  |  |
| RQ | bit |  |  |  |
| RN | bit |  |  |  |
| TR | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: CRF.CN = CRS.CN
- inferred → **CRS**: CRF.CN = CRS.CN (course number)
