# RTG

Report Tags

Rows: 254,805 · Primary key: UID, SC, SN, RNM · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| UID | int |  |  |  |
| SC | smallint |  |  | → STU, LOC |
| SN | int |  |  | → STU |
| RNM | varchar(255) |  |  |  |
| QT | varchar(50) |  |  |  |
| QV | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: RTG.SC = STU.SC AND RTG.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: RTG.SC = LOC.CD (school code)
