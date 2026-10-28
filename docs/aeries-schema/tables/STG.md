# STG

Contains seating chart information – used by Attendance by Photograph in the Teacher Portal

Rows: 1,337 · Primary key: SC, SE, SN · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → STU, MST, LOC |
| SE | smallint |  |  | → MST |
| SN | int |  |  | → STU |
| ST | smallint |  |  |  |
| LP | int |  |  |  |
| TP | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: STG.SC = STU.SC AND STG.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: STG.SC = MST.SC AND STG.SE = MST.SE (section number)
- inferred → **LOC**: STG.SC = LOC.CD (school code)
