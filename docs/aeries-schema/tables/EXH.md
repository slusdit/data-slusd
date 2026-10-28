# EXH

Aeries Web Only. Define which schools an exam can be given at.

Rows: 0 · Primary key: EID, SC · Columns: 4

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → EXM.EID |
| SC | smallint |  |  | FK → LOC.CD |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXM**: EXH.EID = EXM.EID
- declared FK → **LOC**: EXH.SC = LOC.CD
- inferred → **LOC**: EXH.SC = LOC.CD (school code)
