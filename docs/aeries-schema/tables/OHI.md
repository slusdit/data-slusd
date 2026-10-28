# OHI

Digital Store Order History

Rows: 0 · Primary key: SQ · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SQ | int |  |  |  |
| ODN | int |  |  | FK → ODR.ODN |
| IID | int |  |  |  |
| OID | int |  |  |  |
| SID | int |  |  |  |
| SC | int |  |  | → LOC |
| QTY | smallint |  |  |  |
| TOT | money |  |  |  |
| DCN | money |  |  |  |
| DT | datetime | yes |  |  |
| ST | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ODR**: OHI.ODN = ODR.ODN
- inferred → **LOC**: OHI.SC = LOC.CD (school code)
