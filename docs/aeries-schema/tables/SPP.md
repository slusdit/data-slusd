# SPP

Contains Program Participation for each Student to provide for dis-aggregation of data

Rows: 0 · Primary key: SC, SN, PR · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| PR | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: SPP.SC = STU.SC AND SPP.SN = STU.SN
- inferred → **STU**: SPP.SC = STU.SC AND SPP.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: SPP.SC = LOC.CD (school code)
