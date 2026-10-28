# SCP

Contains Student Scrip Purchases

Rows: 0 · Primary key: SC, TN · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STO.SC, STU.SC |
| TN | int |  |  | → TCH |
| SN | int |  |  | FK → STU.SN |
| DT | datetime | yes |  |  |
| ID | varchar(3) |  |  | FK → STO.ID |
| AM | money |  |  |  |
| AC | varchar(3) |  |  |  |
| PT | varchar(6) |  |  |  |
| CN | varchar(50) |  |  | → CRS |
| PB | varchar(70) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STO**: SCP.SC = STO.SC AND SCP.ID = STO.ID
- declared FK → **STU**: SCP.SC = STU.SC AND SCP.SN = STU.SN
- inferred → **STU**: SCP.SC = STU.SC AND SCP.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **CRS**: SCP.CN = CRS.CN (course number)
- inferred → **TCH**: SCP.SC = TCH.SC AND SCP.TN = TCH.TN (teacher number)
- inferred → **LOC**: SCP.SC = LOC.CD (school code)
