# SEC

Student schedules: which sections each student is enrolled in. Has no entry/exit dates (see CAR for schedule change history).

Aeries: Relationships of Student Numbers to Master Schedule section numbers – Student Schedules

Rows: 33,310 · Primary key: SC, SN, SE · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code | FK → MST.SC, STU.SC |
| SN | int |  | Student number | FK → STU.SN |
| SE | smallint |  | Section number (MST.SE) | FK → MST.SE |
| PL | varchar(2) |  |  |  |
| CN | varchar(6) |  | Course number (CRS.CN), denormalised from MST | → CRS |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **MST**: SEC.SC = MST.SC AND SEC.SE = MST.SE
- declared FK → **STU**: SEC.SC = STU.SC AND SEC.SN = STU.SN
- inferred → **STU**: SEC.SC = STU.SC AND SEC.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: SEC.SC = MST.SC AND SEC.SE = MST.SE (section number)
- inferred → **CRS**: SEC.CN = CRS.CN (course number)
- inferred → **LOC**: SEC.SC = LOC.CD (school code)

## Used in views

`CLEVER_ENROLLMENTS`, `ELLEVATION_ListScheduleData`, `FOLLETT_PATRONS`, `Naviance_Student_Courses`, `SLUSD_ACADEMY_SEC`, `SLUSD_Lersun_class_enrollment_AUP`, `SLUSD_Lersun_classes_AUP`, `SLUSD_SLHS_STUDENT_SCHEDULES`, `SLUSD_STUDENT_SCHEDULES_SLHS`, `SLUSD_VPC_CODES`, `llm_all_sections`, `llm_class_rosters`, `llm_course_enrollments`, `llm_staff_roster`, `llm_teacher_courses`, `llm_teacher_student_roster`, `schoology_courses`, `schoology_enrollments`, `schoology_users`

## Used in saved reports

"AP Courses By Ethnicity", "AP Courses by Ethnicity(%)", "AVID NSLP", "Secondary SDC by Class >50%", "Total Enrollment by NSLP(%) (Interdistrict and SDC included)"
