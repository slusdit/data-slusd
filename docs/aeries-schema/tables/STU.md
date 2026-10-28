# STU

Student demographics, one row per student per school (SC + SN). STU.ID is the district Permanent ID.

Aeries: Student demographics

Rows: 20,168 · Primary key: SC, SN · Columns: 242

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code (LOC.CD) | COD STU.SC (43 codes); FK → TCH.SC |
| SN | int |  | Student number, unique within the school |  |
| LN | nvarchar(100) |  | Last name |  |
| FN | nvarchar(100) |  | First name |  |
| MN | nvarchar(100) |  | Middle name |  |
| ID | int |  | Permanent ID, unique district-wide (IDN.ID, ENR.ID) | FK → IDN.ID |
| SX | varchar(1) |  | Sex (legacy field, M/F/N) |  |
| GR | smallint |  | Grade level (-1 = TK/pre-K conventions vary; 0 = K) | COD STU.GR (21 codes) |
| BD | datetime | yes | Birth date |  |
| PG | nvarchar(50) |  | Parent/guardian name |  |
| AD | varchar(55) |  | Street address |  |
| CY | varchar(30) |  | City |  |
| ST | varchar(2) |  | State |  |
| ZC | varchar(5) |  | ZIP code |  |
| ZX | varchar(4) |  |  |  |
| TL | varchar(10) |  | Home telephone |  |
| FW | varchar(10) |  |  |  |
| FX | varchar(5) |  |  |  |
| MW | varchar(10) |  |  |  |
| MX | varchar(5) |  |  |  |
| T1 | varchar(1) |  |  |  |
| T2 | varchar(1) |  |  |  |
| T3 | varchar(1) |  |  |  |
| T4 | varchar(1) |  |  |  |
| T5 | varchar(1) |  |  |  |
| U1 | varchar(1) |  |  | COD STU.U1 (12 codes) |
| U2 | varchar(1) |  |  | COD STU.U2 (5 codes) |
| U3 | varchar(1) |  |  | COD STU.U3 (1 codes) |
| U4 | varchar(1) |  |  | COD STU.U4 (2 codes) |
| U5 | varchar(1) |  |  | COD STU.U5 (2 codes) |
| U6 | varchar(1) |  |  | COD STU.U6 (2 codes) |
| U7 | varchar(1) |  |  | COD STU.U7 (2 codes) |
| U8 | varchar(1) |  |  | COD STU.U8 (3 codes) |
| ED | datetime | yes | Entry date at this school |  |
| LD | datetime | yes | Leave date at this school (null while enrolled) |  |
| GC | varchar(5) |  |  | COD STU.GC (8 codes) |
| MC | varchar(3) |  |  | COD STU.MC (18 codes) |
| EN | varchar(1) |  |  |  |
| EC | varchar(3) |  | aka ethnicity | COD STU.EC (22 codes) |
| SP | varchar(1) |  | Special program / status code (COD STU.SP) | COD STU.SP (17 codes) |
| LS | smallint |  |  | COD STU.LS (34 codes) |
| GP | money |  | Current GPA |  |
| CR | smallint |  | Cumulative credits |  |
| CS | smallint |  |  |  |
| TP | money |  |  |  |
| CP | money |  |  |  |
| UR | smallint |  |  |  |
| CA | money |  |  |  |
| CC | money |  |  |  |
| LCA | money |  |  |  |
| LCC | money |  |  |  |
| CU | smallint |  | Counselor's teacher number (TCH.TN) | FK → TCH.TN |
| ON | int |  |  |  |
| QT | varchar(1) |  |  |  |
| TT | varchar(1) |  |  |  |
| PT | varchar(1) |  |  |  |
| LK | varchar(6) |  |  |  |
| LT | smallint |  |  |  |
| RE | varchar(255) |  |  |  |
| PC | varchar(1) |  |  |  |
| TR | varchar(1) |  | Attendance track |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| TG | varchar(1) |  | Status tag: blank = active; I = inactive, N = no show, etc. (COD STU.TG) | COD STU.TG (31 codes) |
| LG | int |  |  |  |
| LA | int |  |  |  |
| MR | int |  |  |  |
| LR | varchar(1) |  |  |  |
| FK | int |  | aka FamilyKey, Family Key |  |
| GG | money |  |  |  |
| GT | money |  |  |  |
| GK | smallint |  |  |  |
| GS | smallint |  |  |  |
| BM | varchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| HT | smallint |  |  |  |
| WT | smallint |  |  |  |
| EY | varchar(1) |  |  | COD STU.EY (4 codes) |
| HC | varchar(1) |  |  | COD STU.HC (5 codes) |
| L2 | smallint |  |  |  |
| GA | money |  |  |  |
| GD | money |  |  |  |
| SD | datetime | yes |  |  |
| DG | datetime | yes |  |  |
| GPN | money |  |  |  |
| TPN | money |  |  |  |
| CPN | money |  |  |  |
| GGN | money |  |  |  |
| GTN | money |  |  |  |
| PTS | money |  |  |  |
| PUC | money |  |  |  |
| PCS | money |  |  |  |
| QUC | varchar(1) |  |  |  |
| QCS | varchar(1) |  |  |  |
| LF | varchar(1) |  | Language fluency (COD STU.LF; in this district 1 = English Only, 2 = IFEP, 3 = English Learner, 4 = RFEP, 5 = Adult EL) | COD STU.LF (6 codes) |
| HL | varchar(2) |  | Home language code (COD STU.HL) | COD STU.HL (115 codes) |
| SQ | smallint |  |  |  |
| NS | smallint |  | Next school | COD STU.NS (30 codes) |
| HP | varchar(30) |  |  |  |
| DE | smallint |  | Days enrolled year-to-date |  |
| DP | smallint |  | Days present year-to-date |  |
| DA | smallint |  | Days absent year-to-date |  |
| CCG | money |  |  |  |
| GCG | money |  |  |  |
| NG | smallint |  | Next grade |  |
| RAD | varchar(55) |  |  |  |
| RCY | varchar(30) |  |  |  |
| RST | varchar(2) |  |  |  |
| RZC | varchar(5) |  |  |  |
| RZX | varchar(4) |  |  |  |
| NT | smallint |  | aka Next Teacher |  |
| CRL | varchar(2) |  |  |  |
| SM | smallint |  |  |  |
| DM | smallint |  |  |  |
| CID | varchar(10) |  | State Student ID (CALPADS SSID) |  |
| SS | varchar(10) |  |  |  |
| PED | varchar(2) |  | Direct certification flag | COD STU.PED (6 codes) |
| SF | varchar(10) |  |  |  |
| LNA | nvarchar(100) |  |  |  |
| FNA | nvarchar(100) |  |  |  |
| MNA | nvarchar(100) |  |  |  |
| SFA | varchar(10) |  |  |  |
| VDT | datetime | yes |  |  |
| VBD | varchar(1) |  |  |  |
| VBO | varchar(20) |  |  |  |
| BCY | varchar(30) |  | Birth city |  |
| BST | varchar(3) |  | Birth state |  |
| BCU | varchar(2) |  | Birth country |  |
| CL | varchar(2) |  | Correspondence language code |  |
| HLO | varchar(30) |  |  |  |
| DO | varchar(1) |  |  |  |
| HSG | varchar(3) |  |  | COD STU.HSG (14 codes) |
| GEX | varchar(1) |  |  |  |
| IT | varchar(2) |  | Inter/intra-district transfer code (CALPADS) | COD STU.IT (11 codes) |
| ITD | varchar(14) |  | Transfer district |  |
| GRT | varchar(1) |  |  |  |
| EC2 | varchar(3) |  |  |  |
| EC3 | varchar(3) |  |  |  |
| EC4 | varchar(3) |  |  |  |
| EC5 | varchar(3) |  |  |  |
| EC6 | varchar(3) |  |  |  |
| GPA | money |  |  |  |
| TPA | money |  |  |  |
| CPA | money |  |  |  |
| GGA | money |  |  |  |
| GTA | money |  |  |  |
| OCR | smallint |  |  |  |
| OGR | smallint |  |  |  |
| HS | smallint |  |  |  |
| NTR | varchar(1) |  |  |  |
| CIC | varchar(1) |  |  |  |
| AP1 | varchar(3) |  | Attendance program 1 (COD STU.AP1) | COD STU.AP1 (1 codes) |
| AP2 | varchar(3) |  | Attendance program 2 | COD STU.AP2 (1 codes) |
| SEM | varchar(255) |  | Student email |  |
| PEM | varchar(255) |  | Parent email |  |
| U9 | varchar(2) |  |  | COD STU.U9 (1 codes) |
| U10 | varchar(2) |  |  |  |
| DD | datetime | yes |  |  |
| DNR | varchar(1) |  |  | COD STU.DNR (2 codes) |
| CUC | varchar(1) |  |  |  |
| CCS | varchar(1) |  |  |  |
| SES | varchar(1) |  |  |  |
| SG | varchar(2) |  |  |  |
| RN | int |  |  |  |
| VPC | varchar(20) |  | aka Verification Pass Code |  |
| EGD | datetime | yes |  |  |
| CCO | varchar(1) |  |  |  |
| BPS | varchar(1) |  |  |  |
| SWR | varchar(3) |  |  | COD STU.SWR (1 codes) |
| EOY | varchar(3) |  |  |  |
| CO2 | nvarchar(max) |  |  |  |
| RS | smallint |  |  |  |
| MPH | varchar(10) |  |  |  |
| CO3 | nvarchar(max) |  |  |  |
| OID | int |  |  |  |
| NID | varchar(255) |  | aka USERNAME |  |
| AV | bit |  |  |  |
| ETH | varchar(1) |  | Hispanic/Latino ethnicity flag (Y/N) | COD STU.ETH (2 codes) |
| RC1 | varchar(3) |  | Primary race code (COD STU.RC1); 999 = intentionally left blank | COD STU.RC1 (19 codes) |
| RC2 | varchar(3) |  | Second race code |  |
| RC3 | varchar(3) |  | Third race code |  |
| RC4 | varchar(3) |  | Fourth race code |  |
| RC5 | varchar(3) |  | Fifth race code |  |
| U11 | varchar(2) |  | Custom field | COD STU.U11 (13 codes) |
| U12 | varchar(2) |  |  | COD STU.U12 (1 codes) |
| U13 | varchar(2) |  |  | COD STU.U13 (11 codes) |
| INE | varchar(9) |  |  |  |
| TRU | varchar(1) |  |  |  |
| TDM | datetime | yes |  |  |
| OSI | varchar(10) |  |  |  |
| RDT | datetime | yes |  |  |
| ITE | datetime | yes |  |  |
| ENS | int |  |  |  |
| SNS | int |  |  |  |
| SLD | datetime | yes |  |  |
| NIT | varchar(2) |  | aka Next IntDist | COD STU.NIT (9 codes) |
| NTD | varchar(14) |  | aka Next TransDist |  |
| NRS | smallint |  | aka Next ResSchl |  |
| RSY | varchar(255) |  |  |  |
| RP | money |  |  |  |
| RC | varchar(3) |  |  | COD STU.RC (45 codes) |
| NSP | varchar(1) |  | aka Next Prg |  |
| NP1 | varchar(3) |  |  |  |
| NP2 | varchar(3) |  |  |  |
| NGC | varchar(5) |  | aka Next Grid Code |  |
| NP | varchar(1) |  |  |  |
| CGG | money |  |  |  |
| DSL | bit |  |  |  |
| AVI | nvarchar(255) |  |  |  |
| AVD | datetime | yes |  |  |
| MBS | varchar(1) |  |  |  |
| GN | nvarchar(1) |  | Gender (M/F/N/X); prefer this over SX |  |
| IGR | varchar(2) |  |  |  |
| IGG | varchar(2) |  |  |  |
| LVR | varchar(3) |  |  |  |
| CHT | varchar(9) |  |  |  |
| CNS | int |  |  |  |
| SPE | varchar(255) |  |  |  |
| IBC | varchar(3) |  |  |  |
| RG | bit |  |  |  |
| SCT | bit |  |  |  |
| CT | nvarchar(3) |  |  |  |
| RCT | nvarchar(3) |  |  |  |
| CN | nvarchar(2) |  |  |  |
| RCN | nvarchar(2) |  |  |  |
| SCB | varchar(12) |  |  |  |
| EOO | bit |  |  |  |
| OS | nvarchar(3) |  |  |  |
| OSS | nvarchar(3) |  |  |  |
| GSG | money |  |  |  |
| LO1 | datetime | yes |  |  |
| HI1 | datetime | yes |  |  |
| LO2 | datetime | yes |  |  |
| HI2 | datetime | yes |  |  |
| CDT | datetime | yes |  |  |
| WD | datetime | yes |  |  |
| WS | nvarchar(6) |  |  |  |
| WA | nvarchar(6) |  |  |  |
| IGE | datetime | yes |  |  |
| XSR | bit |  |  |  |
| DEL | bit |  | Soft-delete flag |  |
| DTS | datetime | yes | Last change timestamp |  |

## Joins

- declared FK → **IDN**: STU.ID = IDN.ID
- declared FK → **TCH**: STU.SC = TCH.SC AND STU.CU = TCH.TN
- inferred → **LOC**: STU.SC = LOC.CD (school code)
- inferred → **TCH**: STU.SC = TCH.SC AND STU.CU = TCH.TN (counselor)
- inferred → **IDN**: STU.ID = IDN.ID (permanent ID)

## Referenced by (declared FKs)

- **ACR**: ACR.SC = STU.SC AND ACR.SN = STU.SN
- **ATN**: ATN.SC = STU.SC AND ATN.SN = STU.SN
- **ATT**: ATT.SC = STU.SC AND ATT.SN = STU.SN
- **BIL**: BIL.SC = STU.SC AND BIL.SN = STU.SN
- **CAR**: CAR.SC = STU.SC AND CAR.SN = STU.SN
- **DAC**: DAC.SC = STU.SC AND DAC.SN = STU.SN
- **DCL**: DCL.SC = STU.SC AND DCL.SN = STU.SN
- **GBV**: GBV.SC = STU.SC AND GBV.SN = STU.SN
- **GRD**: GRD.SC = STU.SC AND GRD.SN = STU.SN
- **ICL**: ICL.SC = STU.SC AND ICL.SN = STU.SN
- **MSTM**: MSTM.SC = STU.SC AND MSTM.SN = STU.SN
- **PCT**: PCT.SC = STU.SC AND PCT.SN = STU.SN
- **PHE**: PHE.SC = STU.SC AND PHE.SN = STU.SN
- **PSA**: PSA.SC = STU.SC AND PSA.SN = STU.SN
- **PSB**: PSB.SC = STU.SC AND PSB.SN = STU.SN
- **REL**: REL.SC = STU.SC AND REL.SN = STU.SN
- **SAP**: SAP.SC = STU.SC AND SAP.SN = STU.SN
- **SBG**: SBG.SC = STU.SC AND SBG.SN = STU.SN
- **SCP**: SCP.SC = STU.SC AND SCP.SN = STU.SN
- **SEC**: SEC.SC = STU.SC AND SEC.SN = STU.SN
- **SPP**: SPP.SC = STU.SC AND SPP.SN = STU.SN
- **SSD**: SSD.SC = STU.SC AND SSD.SN = STU.SN
- **SSS**: SSS.SC = STU.SC AND SSS.SN = STU.SN
- **SUP**: SUP.SC = STU.SC AND SUP.SN = STU.SN
- **GBS**: GBS.SC = STU.SC AND GBS.SN = STU.SN
- **GBU**: GBU.SC = STU.SC AND GBU.SN = STU.SN
- **SBC**: SBC.SC = STU.SC AND SBC.SN = STU.SN
- **TBC**: TBC.SC = STU.SC AND TBC.SN = STU.SN

## Used in views

`A List of Deleted STU records`, `AListofIDNandSTU`, `AUP_student`, `AlexandriaPatrons`, `All Orphaned IDN Records`, `CLEVER_ENROLLMENTS`, `CLEVER_SECTIONS`, `CLEVER_STUDENTS`, `Compass_Learning_Students`, `CountyDirectCert`, `Discovery_Education_Students`, `ELLEVATION_ListScheduleData`, `ELLEVATION_ListStudentDemoData`, `ELLEVATION_ListTestScoreData`, `ELLEVATION_ListTestScoreData_ELPAC`, `Emergency_Cards_Elementary_English`, `Emergency_Cards_Elementary_Spanish`, `FOLLETT_PATRONS`, `FOOD_SERVICE_CUSTOMERS`, `Google_Student_Accounts`, `Google_Student_Accounts_Daily`, `Google_Student_Accounts_Disable_If_No_Permission_Slip`, `Google_Student_Accounts_Enable_If_Permission_Slip`, `Google_Student_Accounts_Reset_All_Passwords`, `Google_Student_Accounts_Reset_Daily_Passwords`, `Illuminate_Student_Accounts`, `MIISS_DandF`, `MIISS_attendance`, `MIISS_attendance_summary`, `MIISS_elementary_attendance`, `MIISS_elementary_office_referrals`, `MIISS_elementary_tardy`, `MIISS_secondary_attendance`, `MIISS_suspensions`, `Naviance_Parents`, `Naviance_Student_Courses`, `Naviance_Students`, `SEIS_Demographic`, `SEIS_Discipline`, `SLUSD_ACADEMY_SEC`, `SLUSD_ACADEMY_SSS`, `SLUSD_ALL_STUDENT_PORTAL_ACCOUNTS`, `SLUSD_AUTHORIZATIONS`, `SLUSD_CSSB_ELA_HIS`, `SLUSD_CSSB_ELA_WL_PROFICIENCY`, `SLUSD_CSSB_WORLD_LANG_HIS`, `SLUSD_DoNotPhotograph`, `SLUSD_Edgenuity_Students`, `SLUSD_FTE`, `SLUSD_Lersun_class_enrollment_AUP`, `SLUSD_Lersun_classes_AUP`, `SLUSD_Lersun_students_AUP`, `SLUSD_MARKS_GRD`, `SLUSD_MARKS_GRD_HIS`, `SLUSD_MARKS_HIS`, `SLUSD_MISSING_PORTAL_ACCOUNTS`, `SLUSD_MISSING_PORTAL_ACCOUNTS_Elementary`, `SLUSD_MISSING_PORTAL_ACCOUNTS_Secondary`, `SLUSD_NEW_YEAR_PROJECTION`, `SLUSD_NEW_YEAR_PROJECTION_CURRENT_YEAR`, `SLUSD_ParentSquare_Parents`, `SLUSD_PeachJar_Parent_Email`, `SLUSD_SLHS_STUDENT_SCHEDULES`, `SLUSD_SPACE_AVAILABLE`, `SLUSD_STUDENT_SCHEDULES_SLHS`, `SLUSD_Secondary_NoShow_status`, `SLUSD_SpED_Suspensions`, `SLUSD_VPC_CODES`, `SLUSD_demographics`, `SLUSD_eTrition`, `SLUSD_eTrition_Hosted_Aeries`, `SLUSD_elementary_daily_attendance`, `SLUSD_elementary_demographics`, `SLUSD_secondary_demographics`, `SLUSD_secondary_student_absences`, `SLUSD_secondary_student_all_day_absences`, `SLUSD_warm_body_count`, `SLUSD_warm_body_elementary_absences`, `SLUSD_warm_body_elementary_totals`, `SLUSD_warmbody_secondary_absences`, `SLUSD_warmbody_secondary_enrollment`, `change_in_gpa_q1_to_q2`, `eth100`, `eth200`, `eth300`, `eth400`, `eth500`, `eth600`, `eth700`, `eth999`, `ethDistilled`, `llm_all_sections`, `llm_attendance_daily`, `llm_attendance_summary`, `llm_class_rosters`, `llm_course_enrollments`, `llm_discipline_incidents`, `llm_elementary_grades`, `llm_elementary_teachers`, `llm_elpac_scores`, `llm_frpm_status`, `llm_sed_status`, `llm_special_education`, `llm_special_programs`, `llm_student_contacts`, `llm_student_demographics`, `llm_student_enrollment`, `llm_student_gpa`, `llm_student_grades`, `llm_student_program_summary`, `llm_suspension_summary`, `llm_teacher_student_roster`, `llm_test_scores`, `llm_test_scores_current`, `schoology_courses`, `schoology_enrollments`, `schoology_users`

## Used in saved reports

"AP Courses By Ethnicity", "AP Courses by Ethnicity(%)", "AVID NSLP", "CTE Test", "Daily Enrollment (ADA)", "Elementary Daily Attendance", "Enrollment by Grade % (ADA)", "Enrollment by Grade (ADA)", "Enrollment by Grade (Inters Only)", "Enrollment by Grade (Intras Only)", "Enrollment by grade (SDC)", "Gmail Account Status by School", "Grade Distribution", "Projected CALPADS UPP (%)", "SDC Enrollment % by Grade (ADA)", "SLHS Q1 Grade reporting", "School Enrollment By Grade", "Secondary SDC by Class >50%", "Student School Enrollment Count", "TBD EL Count - Student List", "TBD EL Count - Summary", "Teacher Marks Comparison", "Total Enrollment by NSLP(%) (Interdistrict and SDC included)"
