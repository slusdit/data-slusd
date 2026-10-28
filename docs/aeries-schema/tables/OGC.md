# OGC

Stores courses taken outside the normal grade range that could be in a student's Course History and should be counted as a regular course

Rows: 1 · Primary key: SC, CN · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| CN | varchar(6) |  |  | FK → CRS.CN |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| MV | money |  |  |  |
| CR | money |  |  |  |
| OC | bit |  |  |  |
| CU | bit |  |  |  |
| CG | bit |  |  |  |
| ST | bit |  |  |  |
| CP | bit |  |  |  |
| CC | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: OGC.CN = CRS.CN
- inferred → **CRS**: OGC.CN = CRS.CN (course number)
- inferred → **LOC**: OGC.SC = LOC.CD (school code)
