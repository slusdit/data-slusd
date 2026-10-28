# ETS

Aeries Web Only. Store a snapshot of students along with their classes and teachers in an Exam Testing Admin.

Rows: 0 · Primary key: EID, TA, ID · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → ETA.EID |
| TA | int |  |  | FK → ETA.TA |
| ID | int |  |  |  |
| SC | smallint |  |  | → STU, TCH, LOC |
| SN | int |  |  | → STU |
| TN | smallint |  |  | → TCH |
| CID | smallint |  |  |  |
| CDE | varchar(255) |  |  |  |
| CTY | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ETA**: ETS.EID = ETA.EID AND ETS.TA = ETA.TA
- inferred → **STU**: ETS.SC = STU.SC AND ETS.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **TCH**: ETS.SC = TCH.SC AND ETS.TN = TCH.TN (teacher number)
- inferred → **LOC**: ETS.SC = LOC.CD (school code)
