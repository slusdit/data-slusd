# ENR

Enrollment history by Permanent ID: one row per student per school per enrollment spell, across years.

Aeries: Contains enrollment history for a student based on their Permanent ID

Rows: 281,607 · Primary key: ID, YR, SC, SN, ED · Columns: 25

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  | Permanent ID (STU.ID) | FK → IDN.ID |
| YR | smallint |  | School year the enrollment belongs to (start year, e.g. 2026 = 2026-27) |  |
| SC | smallint |  | School code | → STU, TCH, LOC |
| SN | int |  | Student number at that school | → STU |
| TR | varchar(1) |  | Attendance track |  |
| PR | varchar(1) |  | Attendance program |  |
| GR | smallint |  | Grade level during the enrollment |  |
| TN | smallint |  | Teacher number (elementary homeroom) | → TCH |
| ED | datetime |  | Enrollment entry date |  |
| LD | datetime | yes | Enrollment leave date (null while enrolled) |  |
| AP1 | varchar(3) |  |  |  |
| AP2 | varchar(3) |  |  |  |
| TE | varchar(255) |  |  |  |
| ER | varchar(3) |  | Exit/leave reason code (COD ENR.ER) |  |
| NS | int |  | Next school |  |
| HS | smallint |  |  |  |
| IT | varchar(2) |  |  |  |
| NPS | varchar(7) |  |  |  |
| ITD | varchar(14) |  |  |  |
| ET | varchar(2) |  |  |  |
| FA | nvarchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| ETV | varchar(3) |  |  |  |
| XTV | varchar(3) |  |  |  |

## Joins

- declared FK → **IDN**: ENR.ID = IDN.ID
- inferred → **STU**: ENR.SC = STU.SC AND ENR.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **TCH**: ENR.SC = TCH.SC AND ENR.TN = TCH.TN (teacher number)
- inferred → **LOC**: ENR.SC = LOC.CD (school code)

## Used in views

`SLUSD_DAILY_ENROLLMENT`, `SLUSD_eTrition`, `SLUSD_eTrition_Hosted_Aeries`, `SLUSD_elementary_daily_attendance`, `SLUSD_secondary_student_absences`, `SLUSD_secondary_student_all_day_absences`, `SLUSD_warm_body_elementary_absences`, `SLUSD_warm_body_elementary_totals`, `SLUSD_warmbody_secondary_absences`, `llm_attendance_summary`, `llm_student_enrollment`

## Used in saved reports

"Elementary Daily Attendance"
