# DAC

Created by Daily Attendance when Sheets are created

Rows: 0 · Primary key: SC, WK, SH, LI · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| TN | smallint |  |  | → TCH |
| WK | smallint |  |  |  |
| SH | smallint |  |  |  |
| LI | smallint |  |  |  |
| S1 | varchar(1) |  |  |  |
| S2 | varchar(1) |  |  |  |
| S3 | varchar(1) |  |  |  |
| S4 | varchar(1) |  |  |  |
| S5 | varchar(1) |  |  |  |
| S6 | varchar(1) |  |  |  |
| S7 | varchar(1) |  |  |  |
| S8 | varchar(1) |  |  |  |
| S9 | varchar(1) |  |  |  |
| S10 | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: DAC.SC = STU.SC AND DAC.SN = STU.SN
- inferred → **STU**: DAC.SC = STU.SC AND DAC.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **TCH**: DAC.SC = TCH.SC AND DAC.TN = TCH.TN (teacher number)
- inferred → **LOC**: DAC.SC = LOC.CD (school code)
