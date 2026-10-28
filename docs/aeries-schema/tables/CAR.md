# CAR

Course attendance / schedule change history: when students entered and left sections, used for class-level attendance.

Aeries: Records changes in students' class schedules so attendance can be tracked at the course level

Rows: 38,131 · Primary key: SC, SN, SQ · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| CN | varchar(6) |  | aka Course# | FK → CRS.CN |
| D1 | smallint |  |  |  |
| D2 | smallint |  |  |  |
| L1 | smallint |  |  |  |
| L2 | smallint |  |  |  |
| L3 | smallint |  |  |  |
| PD | smallint |  | aka Period |  |
| BL | smallint |  |  |  |
| SE | smallint |  | aka Section | → MST |
| DS | datetime | yes |  |  |
| DE | datetime | yes |  |  |
| TN | smallint |  | aka Teacher# | → TCH |
| SQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: CAR.CN = CRS.CN
- declared FK → **STU**: CAR.SC = STU.SC AND CAR.SN = STU.SN
- inferred → **STU**: CAR.SC = STU.SC AND CAR.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: CAR.SC = MST.SC AND CAR.SE = MST.SE (section number)
- inferred → **CRS**: CAR.CN = CRS.CN (course number)
- inferred → **TCH**: CAR.SC = TCH.SC AND CAR.TN = TCH.TN (teacher number)
- inferred → **LOC**: CAR.SC = LOC.CD (school code)

## Used in views

`SLUSD_Missing_Attendance`, `SLUSD_Secondary_MOU_All_Data`, `SLUSD_Secondary_MOU_Overage_Only`, `SLUSD_secondary_student_absences`, `SLUSD_secondary_student_all_day_absences`, `SLUSD_warmbody_secondary_absences`, `SLUSD_warmbody_secondary_enrollment`
