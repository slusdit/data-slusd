# EFS

Ed-Fi Schools

Rows: 0 · Primary key: CID, SC · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CID | int |  |  | FK → EFO.CID |
| SC | smallint |  |  | → LOC |
| EN | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EFO**: EFS.CID = EFO.CID
- inferred → **LOC**: EFS.SC = LOC.CD (school code)
