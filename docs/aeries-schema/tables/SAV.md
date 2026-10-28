# SAV

Contains Student Schedule Changes for use by the Add/Drop Report

Rows: 0 · Primary key: SC, SN, SE · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → STU, MST, LOC |
| SN | int |  |  | → STU |
| SE | smallint |  |  | → MST |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: SAV.SC = STU.SC AND SAV.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: SAV.SC = MST.SC AND SAV.SE = MST.SE (section number)
- inferred → **LOC**: SAV.SC = LOC.CD (school code)
