# STP

Contains Percentages of purchases

Rows: 0 · Primary key: SC, ID, D1 · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STO.SC |
| ID | varchar(3) |  |  | FK → STO.ID |
| D1 | datetime |  |  |  |
| D2 | datetime | yes |  |  |
| PC | money |  |  |  |
| DT | datetime | yes |  |  |
| AM | money |  |  |  |
| BA | money |  |  |  |
| S1 | varchar(50) |  |  |  |
| S2 | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STO**: STP.SC = STO.SC AND STP.ID = STO.ID
- inferred → **STU**: STP.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: STP.SC = LOC.CD (school code)
