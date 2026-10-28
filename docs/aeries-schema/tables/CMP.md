# CMP

Composite Courses

Rows: 0 · Primary key: CN, CC · Columns: 4

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CN | varchar(6) |  |  | FK → CRS.CN |
| CC | varchar(6) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: CMP.CN = CRS.CN
- inferred → **CRS**: CMP.CN = CRS.CN (course number)
