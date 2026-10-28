# CAC

Campaign Advertisement Connections

Rows: 0 · Primary key: CID, SC, TY, AID · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CID | int |  |  |  |
| SC | int |  |  | → LOC |
| TY | varchar(3) |  |  |  |
| AID | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: CAC.SC = LOC.CD (school code)
