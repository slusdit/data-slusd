# MST

Master schedule: one row per section offered at a school this year.

Aeries: Master Schedule

Rows: 2,425 · Primary key: SC, SE · Columns: 99

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code | FK → TCH.SC |
| SE | smallint |  | Section number (unique within the school) |  |
| PD | smallint |  | Period |  |
| BL | smallint |  |  |  |
| SM | varchar(1) |  | Semester / scheduling group |  |
| DY | varchar(6) |  | Days of the week the section meets |  |
| CN | varchar(6) |  | Course number (CRS.CN) | FK → CRS.CN |
| TN | smallint |  | Teacher number (TCH.TN) | FK → TCH.TN |
| RM | varchar(6) |  | Room |  |
| CR | money |  |  |  |
| SX | varchar(1) |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| MX | smallint |  | Maximum enrollment |  |
| TS | smallint |  | Total students currently enrolled |  |
| TB | smallint |  |  |  |
| TG | smallint |  |  |  |
| PS | smallint |  |  |  |
| GP | varchar(1) |  |  | COD MST.GP (3 codes) |
| ST | varchar(1) |  |  |  |
| TR | varchar(1) |  | Track |  |
| PR | varchar(3) |  |  | COD MST.PR (62 codes) |
| HP | varchar(2) |  |  | COD MST.HP (8 codes) |
| MM | bit |  |  |  |
| MT | bit |  |  |  |
| MW | bit |  |  |  |
| MR | bit |  |  |  |
| MF | bit |  |  |  |
| MS | bit |  |  |  |
| SCL | smallint |  |  |  |
| TN2 | smallint |  |  |  |
| TN3 | smallint |  |  |  |
| MTS | varchar(2) |  |  |  |
| SG | varchar(2) |  |  | COD MST.SG (7 codes) |
| TM | smallint |  | Term the section meets (TRM.TM style; 0 = full year at SLUSD) | COD MST.TM (8 codes) |
| CG | varchar(2) |  |  | COD MST.CG (8 codes) |
| HQT | varchar(1) |  |  |  |
| HQ2 | varchar(1) |  |  |  |
| HQ3 | varchar(1) |  |  |  |
| STG | varchar(1) |  |  | COD MST.STG (2 codes) |
| ADA | varchar(1) |  |  |  |
| ESR | varchar(1) |  |  | COD MST.ESR (6 codes) |
| LI | varchar(2) |  |  |  |
| INS | varchar(3) |  |  |  |
| FS | varchar(3) |  |  | COD MST.FS (2 codes) |
| TEP | varchar(1) |  |  | COD MST.TEP (2 codes) |
| U1 | varchar(3) |  |  | COD MST.U1 (2 codes) |
| U2 | varchar(3) |  |  |  |
| U3 | varchar(3) |  |  |  |
| U4 | varchar(3) |  |  |  |
| U5 | varchar(3) |  |  |  |
| U6 | varchar(3) |  |  |  |
| U7 | varchar(3) |  |  |  |
| U8 | varchar(3) |  |  |  |
| CID | int |  |  |  |
| ISI | varchar(1) |  |  |  |
| DLI | varchar(1) |  |  |  |
| IT | varchar(1) |  |  |  |
| USA | bit |  |  |  |
| PSV | nvarchar(2) |  |  |  |
| CTY | nvarchar(2) |  |  |  |
| MMN | smallint |  |  |  |
| GN | nvarchar(1) |  |  |  |
| TOG | smallint |  |  |  |
| CT | nvarchar(2) |  |  |  |
| HQP | bit |  |  |  |
| SIT | nvarchar(2) |  |  |  |
| ET | nvarchar(2) |  |  |  |
| EE | nvarchar(2) |  |  |  |
| PKT | nvarchar(2) |  |  |  |
| CSC | nvarchar(20) |  |  |  |
| CNC | nvarchar(1) |  |  |  |
| ACC | nvarchar(4) |  |  |  |
| OIT | nvarchar(1) |  |  |  |
| MSC | nvarchar(1) |  |  |  |
| NCA | nvarchar(4) |  |  |  |
| HQC | nvarchar(1) |  |  |  |
| TP1 | nvarchar(3) |  |  |  |
| TP2 | nvarchar(3) |  |  |  |
| TP3 | nvarchar(3) |  |  |  |
| SR1 | nvarchar(3) |  |  |  |
| SR2 | nvarchar(3) |  |  |  |
| SR3 | nvarchar(3) |  |  |  |
| FSQ | int |  |  |  |
| CSQ | int |  |  |  |
| AC | nvarchar(1) |  |  |  |
| NCI | nvarchar(2) |  |  |  |
| CH | smallint |  |  |  |
| ETR | varchar(1) |  |  |  |
| PC | bit |  |  |  |
| MSGE | bit |  |  |  |
| AE | bit |  |  |  |
| AU | nvarchar(6) |  |  |  |
| CL | varchar(6) |  |  |  |
| CCO | varchar(8) |  |  |  |
| CTM | nvarchar(4) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| POI | varchar(1) |  |  |  |

## Joins

- declared FK → **CRS**: MST.CN = CRS.CN
- declared FK → **TCH**: MST.SC = TCH.SC AND MST.TN = TCH.TN
- inferred → **CRS**: MST.CN = CRS.CN (course number)
- inferred → **TCH**: MST.SC = TCH.SC AND MST.TN = TCH.TN (teacher number)
- inferred → **LOC**: MST.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **AWL**: AWL.SCL = MST.SC AND AWL.SE = MST.SE
- **LNC**: LNC.SC = MST.SC AND LNC.SE = MST.SE
- **MSP**: MSP.SC = MST.SC AND MSP.SE = MST.SE
- **MSS**: MSS.SC = MST.SC AND MSS.SE = MST.SE
- **SEC**: SEC.SC = MST.SC AND SEC.SE = MST.SE
- **SSE**: SSE.SC = MST.SC AND SSE.SE = MST.SE
- **TBC**: TBC.SC = MST.SC AND TBC.SE = MST.SE

## Used in views

`CLEVER_SECTIONS`, `ELLEVATION_ListScheduleData`, `FOLLETT_PATRONS`, `FOLLETT_PATRONS_STAFF`, `Naviance_Student_Courses`, `SLUSD_Instructional_Minutes`, `SLUSD_Lersun_class_enrollment_AUP`, `SLUSD_Lersun_classes_AUP`, `SLUSD_MARKS_GRD_HIS`, `SLUSD_Missing_Attendance`, `SLUSD_SAME_PERIOD_COURSES`, `SLUSD_SAME_PERIOD_COURSES_NOT_FILTERED`, `SLUSD_SLHS_STUDENT_SCHEDULES`, `SLUSD_STUDENT_SCHEDULES_SLHS`, `SLUSD_Secondary_MOU_All_Data`, `SLUSD_Secondary_MOU_Overage_Only`, `SLUSD_VPC_CODES`, `SLUSD_warmbody_secondary_enrollment`, `llm_all_sections`, `llm_class_rosters`, `llm_course_enrollments`, `llm_staff_roster`, `llm_student_grades`, `llm_teacher_courses`, `llm_teacher_student_roster`, `schoology_courses`, `schoology_enrollments`, `schoology_users`

## Used in saved reports

"AP Courses By Ethnicity", "AP Courses by Ethnicity(%)", "AVID NSLP", "SLHS Q1 Grade reporting", "Secondary SDC by Class >50%", "Total Enrollment by NSLP(%) (Interdistrict and SDC included)"
