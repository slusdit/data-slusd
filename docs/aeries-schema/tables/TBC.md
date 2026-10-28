# TBC

Contains all of the individual textbook copies and their assignment (who they're checked out to)

Rows: 0 · Primary key: SC, TN, CY · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → TBT.SC, MST.SC, STU.SC, TCH.SC |
| TN | smallint |  |  | FK → TBT.TN |
| CY | smallint |  |  |  |
| BC | varchar(50) |  |  |  |
| SN | int |  |  | FK → STU.SN |
| PD | smallint |  |  |  |
| TC | smallint |  |  | FK → TCH.TN |
| RM | varchar(4) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| CC | varchar(1) |  |  |  |
| ST | varchar(1) |  |  |  |
| CD | varchar(1) |  |  |  |
| DT | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| SE | smallint |  |  | FK → MST.SE |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **TBT**: TBC.SC = TBT.SC AND TBC.TN = TBT.TN
- declared FK → **MST**: TBC.SC = MST.SC AND TBC.SE = MST.SE
- declared FK → **STU**: TBC.SC = STU.SC AND TBC.SN = STU.SN
- declared FK → **TCH**: TBC.SC = TCH.SC AND TBC.TC = TCH.TN
- inferred → **STU**: TBC.SC = STU.SC AND TBC.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: TBC.SC = MST.SC AND TBC.SE = MST.SE (section number)
- inferred → **CRS**: TBC.CN = CRS.CN (course number)
- inferred → **TCH**: TBC.SC = TCH.SC AND TBC.TN = TCH.TN (teacher number)
- inferred → **LOC**: TBC.SC = LOC.CD (school code)
