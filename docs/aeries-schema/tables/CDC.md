# CDC

Aeries Web only. Contains documents specific to each Course.

Rows: 2 · Primary key: CN, SQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CN | varchar(6) |  |  | FK → CRS.CN |
| SQ | int |  |  |  |
| NM | varchar(255) |  |  |  |
| XT | varchar(255) |  |  |  |
| RB | varbinary(max) | yes |  |  |
| SZ | int |  |  |  |
| DP | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: CDC.CN = CRS.CN
- inferred → **CRS**: CDC.CN = CRS.CN (course number)
