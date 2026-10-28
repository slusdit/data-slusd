# ATC

Days that a Supplemental Attendance Session meets

Rows: 432 · Primary key: SC, SE, DT · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → ATS.SC |
| SE | int |  |  | FK → ATS.SE |
| DT | datetime |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ATS**: ATC.SC = ATS.SC AND ATC.SE = ATS.SE
- inferred → **MST**: ATC.SC = MST.SC AND ATC.SE = MST.SE (section number)
- inferred → **LOC**: ATC.SC = LOC.CD (school code)
