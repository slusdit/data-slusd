# REQ

Maintains graduation requirements – Can be DISTRICT MANAGED.

Rows: 285 · Primary key: SC, GRT, CD · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| CD | varchar(6) |  |  |  |
| SA | varchar(255) |  |  |  |
| C1 | money |  |  |  |
| C2 | money |  |  |  |
| C3 | money |  |  |  |
| C4 | money |  |  |  |
| GRT | varchar(1) |  |  | COD REQ.GRT (7 codes) |
| NMC | bit |  |  |  |
| LC | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: REQ.SC = LOC.CD (school code)
