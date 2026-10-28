# ASL

Maintains a record when teachers submit attendance through Teacher Portal - Generates Missing Sheet Log

Rows: 22,627 · Primary key: SC, TN, DT · Columns: 48

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → TCH.SC |
| TN | smallint |  |  | FK → TCH.TN |
| DT | datetime |  |  |  |
| P0 | varchar(1) |  |  |  |
| P1 | varchar(1) |  |  |  |
| P2 | varchar(1) |  |  |  |
| P3 | varchar(1) |  |  |  |
| P4 | varchar(1) |  |  |  |
| P5 | varchar(1) |  |  |  |
| P6 | varchar(1) |  |  |  |
| P7 | varchar(1) |  |  |  |
| P8 | varchar(1) |  |  |  |
| P9 | varchar(1) |  |  |  |
| T0 | datetime | yes |  |  |
| T1 | datetime | yes |  |  |
| T2 | datetime | yes |  |  |
| T3 | datetime | yes |  |  |
| T4 | datetime | yes |  |  |
| T5 | datetime | yes |  |  |
| T6 | datetime | yes |  |  |
| T7 | datetime | yes |  |  |
| T8 | datetime | yes |  |  |
| T9 | datetime | yes |  |  |
| PL | varchar(1) |  |  |  |
| TL | datetime | yes |  |  |
| C0 | varchar(255) |  |  |  |
| C1 | varchar(255) |  |  |  |
| C2 | varchar(255) |  |  |  |
| C3 | varchar(255) |  |  |  |
| C4 | varchar(255) |  |  |  |
| C5 | varchar(255) |  |  |  |
| C6 | varchar(255) |  |  |  |
| C7 | varchar(255) |  |  |  |
| C8 | varchar(255) |  |  |  |
| C9 | varchar(255) |  |  |  |
| F0 | datetime | yes |  |  |
| F1 | datetime | yes |  |  |
| F2 | datetime | yes |  |  |
| F3 | datetime | yes |  |  |
| F4 | datetime | yes |  |  |
| F5 | datetime | yes |  |  |
| F6 | datetime | yes |  |  |
| F7 | datetime | yes |  |  |
| F8 | datetime | yes |  |  |
| F9 | datetime | yes |  |  |
| FL | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **TCH**: ASL.SC = TCH.SC AND ASL.TN = TCH.TN
- inferred → **TCH**: ASL.SC = TCH.SC AND ASL.TN = TCH.TN (teacher number)
- inferred → **LOC**: ASL.SC = LOC.CD (school code)

## Used in views

`SLUSD_Missing_Attendance`
