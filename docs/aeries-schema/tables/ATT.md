# ATT

Daily attendance marks, one row per student per day that has at least one mark. No row = present all day.

Aeries: Maintains Dates of Enrollment, Absences and Absence Reasons, and Un-enrollment

Rows: 103,687 · Primary key: SC, SN, DY · Columns: 35

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code | FK → ABS.SC, DAY.SC, STU.SC, TCH.SC |
| SN | int |  | Student number | FK → STU.SN |
| DY | smallint |  | Day number in the school calendar (DAY.DY) | FK → DAY.DY |
| CD | nvarchar(1) |  | Enrollment status code on this date (e.g. E = entered, L = left) |  |
| PR | nvarchar(1) |  | Program |  |
| GR | smallint |  | Grade level on this date |  |
| TR | varchar(1) |  | Track |  |
| TN | smallint |  | Teacher number on this date | FK → TCH.TN |
| AL | varchar(1) |  | All-day absence code (ABS.CD) | ABS.CD (per school); FK → ABS.CD |
| A0 | nvarchar(1) |  | Period 0 code (ABS.CD) | ABS.CD (per school) |
| A1 | nvarchar(1) |  | Period 1 code | ABS.CD (per school) |
| A2 | nvarchar(1) |  | Period 2 code | ABS.CD (per school) |
| A3 | nvarchar(1) |  | Period 3 code | ABS.CD (per school) |
| A4 | nvarchar(1) |  | Period 4 code | ABS.CD (per school) |
| A5 | nvarchar(1) |  | Period 5 code | ABS.CD (per school) |
| A6 | nvarchar(1) |  | Period 6 code | ABS.CD (per school) |
| A7 | nvarchar(1) |  | Period 7 code | ABS.CD (per school) |
| A8 | nvarchar(1) |  | Period 8 code | ABS.CD (per school) |
| A9 | nvarchar(1) |  | Period 9 code | ABS.CD (per school) |
| DT | datetime | yes | Attendance date |  |
| RS | nvarchar(3) |  | Reason / note |  |
| NS | int |  |  |  |
| AP1 | nvarchar(3) |  | Attendance program 1 |  |
| AP2 | nvarchar(3) |  | Attendance program 2 |  |
| HS | smallint |  |  |  |
| IT | varchar(2) |  |  |  |
| NPS | varchar(7) |  |  |  |
| ITD | varchar(14) |  |  |  |
| ADA | varchar(1) |  |  | COD ATT.ADA (1 codes) |
| ADT | datetime | yes |  |  |
| ACO | nvarchar(max) |  |  |  |
| FA | nvarchar(1) |  |  |  |
| AMU | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ABS**: ATT.SC = ABS.SC AND ATT.AL = ABS.CD
- declared FK → **DAY**: ATT.SC = DAY.SC AND ATT.DY = DAY.DY
- declared FK → **STU**: ATT.SC = STU.SC AND ATT.SN = STU.SN
- declared FK → **TCH**: ATT.SC = TCH.SC AND ATT.TN = TCH.TN
- inferred → **STU**: ATT.SC = STU.SC AND ATT.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **TCH**: ATT.SC = TCH.SC AND ATT.TN = TCH.TN (teacher number)
- inferred → **LOC**: ATT.SC = LOC.CD (school code)

## Used in views

`A list of Deleted ATT records`, `MIISS_attendance`, `MIISS_attendance_summary`, `MIISS_elementary_attendance`, `MIISS_elementary_tardy`, `MIISS_secondary_attendance`, `MIISS_secondary_tardy`, `SLUSD_eTrition_Hosted_Aeries`, `SLUSD_elementary_daily_attendance`, `SLUSD_secondary_student_absences`, `SLUSD_secondary_student_all_day_absences`, `SLUSD_warm_body_elementary_absences`, `SLUSD_warm_body_elementary_totals`, `SLUSD_warmbody_secondary_absences`, `llm_attendance_daily`, `llm_attendance_summary`

## Used in saved reports

"Elementary Daily Attendance", "SLHS Q1 Grade reporting"
