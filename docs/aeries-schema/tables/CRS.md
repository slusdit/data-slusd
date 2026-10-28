# CRS

Course catalogue (district-wide): one row per course number.

Aeries: Contains details of Courses offered at a Secondary School

Rows: 1,792 · Primary key: CN · Columns: 103

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CN | varchar(6) |  | Course number |  |
| CO | nvarchar(30) |  | Course title |  |
| NA | varchar(1) |  |  |  |
| S1 | varchar(6) |  | Subject area 1 (graduation requirement bucket) | COD CRS.S1 (18 codes) |
| S2 | varchar(6) |  | Subject area 2 |  |
| S3 | varchar(6) |  |  |  |
| C3 | varchar(4) |  |  |  |
| C2 | varchar(3) |  |  |  |
| C1 | varchar(1) |  |  |  |
| CP | varchar(1) |  |  |  |
| PR | varchar(6) |  |  |  |
| AL | varchar(6) |  |  |  |
| CR | money |  | Credits |  |
| MC | money |  |  |  |
| DE | varchar(255) |  | Course description |  |
| F1 | money |  |  |  |
| F2 | money |  |  |  |
| TM | varchar(1) |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| E1 | varchar(1) |  |  |  |
| E2 | varchar(1) |  |  | COD CRS.E2 (16 codes) |
| E3 | varchar(1) |  |  |  |
| U1 | varchar(1) |  |  |  |
| U2 | varchar(1) |  |  |  |
| U3 | varchar(1) |  |  |  |
| DC | varchar(6) |  | Department code (COD CRS.DC) | COD CRS.DC (14 codes) |
| EX | varchar(1) |  |  |  |
| TA | bit |  |  |  |
| TG | varchar(1) |  | Tag / inactive flag |  |
| AE | varchar(8) |  |  |  |
| US | varchar(14) |  |  |  |
| VCL | varchar(2) |  |  |  |
| CL | varchar(2) |  | Course level |  |
| TY | varchar(2) |  |  |  |
| NC | varchar(6) |  |  |  |
| TS | smallint |  |  |  |
| YS | smallint |  |  |  |
| TGN | varchar(1) |  |  |  |
| CSE | varchar(1) |  |  |  |
| CSH | varchar(1) |  |  |  |
| NCC | varchar(1) |  |  | COD CRS.NCC (6 codes) |
| VL | varchar(2) |  |  |  |
| CA1 | varchar(2) |  |  | COD CRS.CA1 (10 codes) |
| CA2 | varchar(2) |  |  |  |
| CS | varchar(8) |  | State course code |  |
| CCG | varchar(4) |  |  | COD CRS.CCG (1 codes) |
| MX | smallint |  |  |  |
| BD | datetime | yes |  |  |
| RD | datetime | yes |  |  |
| RT | varchar(1) |  |  |  |
| ID | datetime | yes |  |  |
| AC | smallint |  |  |  |
| UC1 | varchar(3) |  |  | COD CRS.UC1 (2 codes) |
| UC2 | varchar(3) |  |  |  |
| UC3 | varchar(3) |  |  |  |
| UC4 | varchar(3) |  |  |  |
| UC5 | varchar(3) |  |  |  |
| UC6 | varchar(3) |  |  |  |
| UC7 | varchar(3) |  |  | COD CRS.UC7 (1 codes) |
| UC8 | varchar(3) |  |  | COD CRS.UC8 (10 codes) |
| ALR | bit |  |  |  |
| ALC | money |  |  |  |
| CM | nvarchar(max) |  |  |  |
| CD | nvarchar(max) |  |  |  |
| VLU | varchar(2) |  |  |  |
| PE | bit |  |  |  |
| CL1 | varchar(2) |  |  |  |
| CO1 | nvarchar(30) |  |  |  |
| CL2 | varchar(2) |  |  |  |
| CO2 | nvarchar(30) |  |  |  |
| CL3 | varchar(2) |  |  |  |
| CO3 | nvarchar(30) |  |  |  |
| CL4 | varchar(2) |  |  |  |
| CO4 | nvarchar(30) |  |  |  |
| CL5 | varchar(2) |  |  |  |
| CO5 | nvarchar(30) |  |  |  |
| CL6 | varchar(2) |  |  |  |
| CO6 | nvarchar(30) |  |  |  |
| NTG | varchar(1) |  |  |  |
| CSQ | varchar(2) |  |  |  |
| NCI | varchar(2) |  |  |  |
| HC | money |  |  |  |
| SVC | nvarchar(8) |  |  |  |
| PSV | nvarchar(2) |  |  |  |
| CTY | nvarchar(2) |  |  |  |
| CC | money |  |  |  |
| NC3 | varchar(4) |  |  |  |
| CSC | nvarchar(20) |  |  |  |
| SGR | nvarchar(6) |  |  |  |
| CSA | nvarchar(3) |  |  |  |
| CNC | nvarchar(1) |  |  |  |
| ACC | nvarchar(4) |  |  |  |
| MSC | nvarchar(1) |  |  |  |
| OD | nvarchar(1) |  |  |  |
| CIP | nvarchar(7) |  |  |  |
| EE | nvarchar(1) |  |  |  |
| CC3 | varchar(4) |  |  |  |
| SDS | nvarchar(50) |  |  |  |
| S4 | varchar(6) |  |  |  |
| S5 | varchar(6) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **ACR**: ACR.CN = CRS.CN
- **CAR**: CAR.CN = CRS.CN
- **CCC**: CCC.CN = CRS.CN
- **CCH**: CCH.CN = CRS.CN
- **CCP**: CCP.CN = CRS.CN
- **CDC**: CDC.CN = CRS.CN
- **CMP**: CMP.CN = CRS.CN
- **CPR**: CPR.CN = CRS.CN
- **CRF**: CRF.CN = CRS.CN
- **CRP**: CRP.CN = CRS.CN
- **CRQ**: CRQ.CN = CRS.CN
- **DRC**: DRC.CN = CRS.CN
- **GRD**: GRD.CN = CRS.CN
- **HIS**: HIS.CN = CRS.CN
- **MST**: MST.CN = CRS.CN
- **OGC**: OGC.CN = CRS.CN
- **SBR**: SBR.CN = CRS.CN
- **SMS**: SMS.CN = CRS.CN
- **SSC**: SSC.CN = CRS.CN
- **SSS**: SSS.CN = CRS.CN

## Used in views

`CLEVER_SECTIONS`, `ELLEVATION_ListScheduleData`, `FOLLETT_PATRONS`, `Naviance_Student_Courses`, `SLUSD_CSSB_ELA_HIS`, `SLUSD_CSSB_WORLD_LANG_HIS`, `SLUSD_Instructional_Minutes`, `SLUSD_Lersun_class_enrollment_AUP`, `SLUSD_Lersun_classes_AUP`, `SLUSD_MARKS_GRD`, `SLUSD_MARKS_GRD_HIS`, `SLUSD_MARKS_HIS`, `SLUSD_SAME_PERIOD_COURSES`, `SLUSD_SAME_PERIOD_COURSES_NOT_FILTERED`, `SLUSD_SLHS_STUDENT_SCHEDULES`, `SLUSD_STUDENT_SCHEDULES_SLHS`, `SLUSD_Secondary_MOU_All_Data`, `SLUSD_Secondary_MOU_Overage_Only`, `SLUSD_secondary_student_absences`, `SLUSD_warmbody_secondary_absences`, `SLUSD_warmbody_secondary_enrollment`, `llm_all_sections`, `llm_class_rosters`, `llm_course_enrollments`, `llm_student_grades`, `llm_teacher_courses`, `llm_teacher_student_roster`, `schoology_courses`, `schoology_enrollments`, `schoology_users`, `slusd_grades_COVID19`

## Used in saved reports

"AP Courses By Ethnicity", "AP Courses by Ethnicity(%)", "AVID NSLP", "SLHS Q1 Grade reporting", "Secondary SDC by Class >50%", "Total Enrollment by NSLP(%) (Interdistrict and SDC included)"
