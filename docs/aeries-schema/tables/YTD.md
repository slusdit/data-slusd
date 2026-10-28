# YTD

Year-to-date attendance totals per student (maintained by Aeries).

Aeries: Contains Student Attendance data from the beginning of school to the current date

Rows: 720 · Primary key: SC, TR, PR, GR, TN, SE, MO · Columns: 46

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → TCH.SC |
| TR | varchar(1) |  |  |  |
| PR | varchar(7) |  |  |  |
| GR | smallint |  |  |  |
| TN | smallint |  |  | FK → TCH.TN |
| MO | smallint |  |  |  |
| GP | smallint |  |  |  |
| DA | smallint |  |  |  |
| SD | smallint |  |  |  |
| CF | smallint |  |  |  |
| GN | smallint |  |  |  |
| LO | smallint |  |  |  |
| NE | smallint |  |  |  |
| NA | smallint |  |  |  |
| PV | smallint |  |  |  |
| AA | smallint |  |  |  |
| AS | smallint |  |  |  |
| TD | smallint |  |  |  |
| TA | int |  |  |  |
| LA | smallint |  |  |  |
| N1 | smallint |  |  |  |
| N2 | smallint |  |  |  |
| N3 | smallint |  |  |  |
| N4 | smallint |  |  |  |
| N5 | smallint |  |  |  |
| N6 | smallint |  |  |  |
| N7 | smallint |  |  |  |
| N8 | smallint |  |  |  |
| N9 | smallint |  |  |  |
| N10 | smallint |  |  |  |
| N11 | smallint |  |  |  |
| N12 | smallint |  |  |  |
| N13 | smallint |  |  |  |
| N14 | smallint |  |  |  |
| N15 | smallint |  |  |  |
| N16 | smallint |  |  |  |
| N17 | smallint |  |  |  |
| N18 | smallint |  |  |  |
| N19 | smallint |  |  |  |
| N20 | smallint |  |  |  |
| UNV | smallint |  |  |  |
| ISI | smallint |  |  |  |
| ISC | smallint |  |  |  |
| SE | smallint |  |  | → MST |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **TCH**: YTD.SC = TCH.SC AND YTD.TN = TCH.TN
- inferred → **MST**: YTD.SC = MST.SC AND YTD.SE = MST.SE (section number)
- inferred → **TCH**: YTD.SC = TCH.SC AND YTD.TN = TCH.TN (teacher number)
- inferred → **LOC**: YTD.SC = LOC.CD (school code)
