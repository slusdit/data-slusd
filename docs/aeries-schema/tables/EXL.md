# EXL

Aeries Web Only. Aeries Analytics Table for Exam Printing Log.

Rows: 0 · Primary key: SC, EID, DT · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| EID | int |  |  | FK → EXM.EID |
| DT | datetime |  |  |  |
| USR | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXM**: EXL.EID = EXM.EID
- inferred → **LOC**: EXL.SC = LOC.CD (school code)
