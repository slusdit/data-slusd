# TCH

Teachers per school: one row per teacher number. Also used for counselors (STU.CU).

Aeries: Contains basic information about Teachers

Rows: 1,248 · Primary key: SC, TN · Columns: 61

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code | COD TCH.SC (42 codes); → LOC |
| TN | smallint |  | Teacher number (unique within the school) |  |
| TE | nvarchar(30) |  | Teacher name (Last, First) |  |
| TF | nvarchar(20) |  | First name |  |
| TT | nvarchar(4) |  |  |  |
| SS | int |  |  |  |
| PD | varchar(10) |  |  |  |
| MX | smallint |  |  |  |
| RM | varchar(6) |  | Room |  |
| BM | varchar(255) |  |  |  |
| MS | smallint |  |  |  |
| TS | smallint |  |  |  |
| ET | varchar(1) |  |  |  |
| ID | int |  | Staff ID (STF.ID) | FK → STF.ID |
| TR | varchar(1) |  |  |  |
| EM | varchar(255) |  | Email |  |
| CB | varchar(4) |  |  |  |
| TG | varchar(1) |  | Tag / inactive flag | COD TCH.TG (2 codes) |
| ID2 | int |  |  |  |
| ID3 | int |  |  |  |
| MTS | varchar(2) |  |  |  |
| HQT | varchar(1) |  |  |  |
| TLN | varchar(50) |  | aka Last, Teacher Last, LAST NAME, LAST_NAME |  |
| NCC | varchar(1) |  |  |  |
| HQ2 | varchar(1) |  |  |  |
| HQ3 | varchar(1) |  |  |  |
| ESR | varchar(1) |  |  | COD TCH.ESR (4 codes) |
| LI | varchar(2) |  |  |  |
| INS | varchar(3) |  |  |  |
| FS | varchar(3) |  |  | COD TCH.FS (2 codes) |
| U1 | varchar(3) |  | Custom field 1 | COD TCH.U1 (3 codes) |
| U2 | varchar(3) |  | Custom field 2 | COD TCH.U2 (3 codes) |
| U3 | varchar(3) |  |  | COD TCH.U3 (1 codes) |
| U4 | varchar(3) |  |  | COD TCH.U4 (8 codes) |
| U5 | varchar(3) |  |  |  |
| U6 | varchar(3) |  |  |  |
| U7 | varchar(3) |  |  |  |
| U8 | varchar(3) |  |  |  |
| LO | smallint |  | Low grade |  |
| HI | smallint |  | High grade |  |
| WS | varchar(255) |  |  |  |
| CID | int |  |  |  |
| CA1 | varchar(2) |  |  |  |
| CA2 | varchar(2) |  |  |  |
| IT | varchar(1) |  |  |  |
| ISI | varchar(1) |  |  |  |
| DLI | varchar(1) |  |  |  |
| NTG | varchar(1) |  |  |  |
| TFG | smallint |  |  |  |
| TMB | smallint |  |  |  |
| TOG | smallint |  |  |  |
| CSC | nvarchar(20) |  |  |  |
| CNC | nvarchar(1) |  |  |  |
| OIT | nvarchar(1) |  |  |  |
| NCA | nvarchar(4) |  |  |  |
| SGR | nvarchar(6) |  |  |  |
| CSA | nvarchar(3) |  |  |  |
| MSC | nvarchar(1) |  |  |  |
| CSQ | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STF**: TCH.ID = STF.ID
- inferred → **STU**: TCH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: TCH.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **ASL**: ASL.SC = TCH.SC AND ASL.TN = TCH.TN
- **ATT**: ATT.SC = TCH.SC AND ATT.TN = TCH.TN
- **STU**: STU.SC = TCH.SC AND STU.CU = TCH.TN
- **YTD**: YTD.SC = TCH.SC AND YTD.TN = TCH.TN
- **GRD**: GRD.SC = TCH.SC AND GRD.TN = TCH.TN
- **LNC**: LNC.SC = TCH.SC AND LNC.TN = TCH.TN
- **MST**: MST.SC = TCH.SC AND MST.TN = TCH.TN
- **SMS**: SMS.SC = TCH.SC AND SMS.TN = TCH.TN
- **SSS**: SSS.SC = TCH.SC AND SSS.TN = TCH.TN
- **TBC**: TBC.SC = TCH.SC AND TBC.TC = TCH.TN

## Used in views

`AUP_Teacher`, `AUP_student`, `AlexandriaPatrons`, `CLEVER_ADMINS`, `CLEVER_ENROLLMENTS`, `CLEVER_SECTIONS`, `CLEVER_TEACHERS`, `Compass_Learning_Teachers`, `EDGENUITY_TEACHER`, `ELLEVATION_ListPersonData`, `ELLEVATION_ListScheduleData`, `Emergency_Cards_Elementary_English`, `Emergency_Cards_Elementary_Spanish`, `FOLLETT_PATRONS`, `FOLLETT_PATRONS_STAFF`, `FOOD_SERVICE_CUSTOMERS`, `MIISS_DandF`, `Naviance_Student_Courses`, `Naviance_Students`, `Naviance_Teachers`, `SLUSD_ALL_STUDENT_PORTAL_ACCOUNTS`, `SLUSD_Edgenuity_Teachers`, `SLUSD_FTE`, `SLUSD_Instructional_Minutes`, `SLUSD_Lersun_class_enrollment_AUP`, `SLUSD_Lersun_classes_AUP`, `SLUSD_Lersun_students_AUP`, `SLUSD_MARKS_GRD_HIS`, `SLUSD_MISSING_PORTAL_ACCOUNTS`, `SLUSD_MISSING_PORTAL_ACCOUNTS_Elementary`, `SLUSD_MISSING_PORTAL_ACCOUNTS_Secondary`, `SLUSD_NEW_YEAR_PROJECTION`, `SLUSD_NEW_YEAR_PROJECTION_CURRENT_YEAR`, `SLUSD_SAME_PERIOD_COURSES`, `SLUSD_SAME_PERIOD_COURSES_NOT_FILTERED`, `SLUSD_SLHS_STUDENT_SCHEDULES`, `SLUSD_SPACE_AVAILABLE`, `SLUSD_STUDENT_SCHEDULES_SLHS`, `SLUSD_Secondary_MOU_All_Data`, `SLUSD_Secondary_MOU_Overage_Only`, `SLUSD_VPC_CODES`, `SLUSD_demographics`, `SLUSD_eTrition`, `SLUSD_eTrition_Hosted_Aeries`, `SLUSD_elementary_demographics`, `SLUSD_secondary_demographics`, `SLUSD_warm_body_count`, `SLUSD_warm_body_elementary_totals`, `SLUSD_warmbody_secondary_enrollment`, `llm_all_sections`, `llm_class_rosters`, `llm_course_enrollments`, `llm_elementary_grades`, `llm_elementary_teachers`, `llm_staff_roster`, `llm_student_demographics`, `llm_student_enrollment`, `llm_student_grades`, `llm_teacher_courses`, `llm_teacher_student_roster`, `schoology_courses`, `schoology_enrollments`, `schoology_users`, `slusd_grades_COVID19`

## Used in saved reports

"AP Courses By Ethnicity", "AP Courses by Ethnicity(%)", "AVID NSLP", "CTE Test", "Enrollment by Grade % (ADA)", "Enrollment by Grade (ADA)", "Enrollment by Grade (Inters Only)", "Enrollment by Grade (Intras Only)", "Enrollment by grade (SDC)", "Grade Distribution", "Projected CALPADS UPP (%)", "SDC Enrollment % by Grade (ADA)", "SLHS Q1 Grade reporting", "School Enrollment By Grade", "Secondary Grade Distribution", "Secondary SDC by Class >50%", "Secondary Teacher Grade Counts", "TBD EL Count - Student List", "TBD EL Count - Summary", "Teacher Marks Comparison", "Total Enrollment by NSLP(%) (Interdistrict and SDC included)"
