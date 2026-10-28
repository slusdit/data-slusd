# LOC

Schools in the district, one row per school code.

Aeries: Names, Addresses, and Function variables of schools within the District – Can be DISTRICT MANAGED.

Rows: 38 · Primary key: CD · Columns: 185

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CD | smallint |  | School code (STU.SC) |  |
| NM | nvarchar(60) |  | School name |  |
| AD | varchar(55) |  | Address |  |
| CY | varchar(30) |  | City |  |
| ST | varchar(2) |  | aka School_State1 |  |
| ZC | varchar(10) |  | aka School_Zip1 |  |
| AC | varchar(3) |  |  |  |
| TL | varchar(8) |  | Telephone |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| A | varchar(1) |  |  |  |
| B | varchar(1) |  |  |  |
| C | varchar(1) |  |  |  |
| D | varchar(1) |  |  |  |
| E | varchar(1) |  |  |  |
| F | varchar(1) |  |  |  |
| G | varchar(1) |  |  |  |
| H | varchar(1) |  |  |  |
| I | varchar(1) |  |  |  |
| J | varchar(1) |  |  |  |
| K | varchar(2) |  |  |  |
| L | varchar(1) |  |  |  |
| M | varchar(1) |  |  |  |
| N | varchar(1) |  |  |  |
| O | varchar(1) |  |  |  |
| P | varchar(1) |  |  |  |
| Q | varchar(1) |  |  |  |
| R | varchar(1) |  |  |  |
| S | varchar(1) |  |  |  |
| T | varchar(1) |  |  |  |
| U | varchar(1) |  | Unused / inactive flag |  |
| V | varchar(1) |  |  |  |
| W | varchar(1) |  |  |  |
| X | varchar(1) |  |  |  |
| Y | varchar(1) |  |  |  |
| Z | varchar(1) |  |  |  |
| L1 | smallint |  |  |  |
| L2 | smallint |  |  |  |
| L3 | smallint |  |  |  |
| MS | nvarchar(80) |  |  |  |
| RT | nvarchar(50) |  |  |  |
| PC | varchar(1) |  |  |  |
| PG | varchar(1) |  |  |  |
| PP | varchar(1) |  |  |  |
| PN | varchar(6) |  |  |  |
| PE | nvarchar(30) |  |  |  |
| SO | varchar(1) |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| G1 | int |  |  |  |
| A1 | int |  |  |  |
| S1 | int |  |  |  |
| P1 | int |  |  |  |
| PR | nvarchar(25) |  | Principal |  |
| ID | int |  |  |  |
| CC | varchar(3) |  |  |  |
| DC | varchar(6) |  |  |  |
| SC | varchar(9) |  |  |  |
| XP | varchar(1) |  |  |  |
| XG | varchar(1) |  |  |  |
| XA | varchar(1) |  |  |  |
| XV | varchar(1) |  |  |  |
| XD | varchar(1) |  |  |  |
| XF | varchar(1) |  |  |  |
| PA | varchar(1) |  |  |  |
| EN | varchar(1) |  |  |  |
| PS | datetime | yes |  |  |
| GS | datetime | yes |  |  |
| TM | smallint |  |  |  |
| DM | varchar(1) |  |  |  |
| SQ | smallint |  |  |  |
| V1 | varchar(1) |  |  |  |
| V2 | varchar(1) |  |  |  |
| V3 | varchar(1) |  |  |  |
| V4 | varchar(1) |  |  |  |
| V5 | varchar(1) |  |  |  |
| V6 | varchar(1) |  |  |  |
| V7 | varchar(1) |  |  |  |
| V8 | varchar(1) |  |  |  |
| R1 | bit |  |  |  |
| R2 | bit |  |  |  |
| R3 | bit |  |  |  |
| R4 | bit |  |  |  |
| PH | varchar(255) |  |  |  |
| R5 | bit |  |  |  |
| R6 | bit |  |  |  |
| R7 | bit |  |  |  |
| R8 | bit |  |  |  |
| GPA | int |  |  |  |
| WPX | datetime | yes |  |  |
| FCP | varchar(50) |  |  |  |
| IDT | varchar(2) |  |  |  |
| CU | varchar(2) |  |  |  |
| D3 | datetime | yes |  |  |
| D4 | datetime | yes |  |  |
| D5 | datetime | yes |  |  |
| SLP | varchar(1) |  |  |  |
| YCU | money |  |  |  |
| CI | int |  |  |  |
| CIC | int |  |  |  |
| CIA | smallint |  |  |  |
| CCW | smallint |  |  |  |
| SCT | varchar(2) |  |  |  |
| CSR | varchar(60) |  |  |  |
| HCT | varchar(1) |  |  |  |
| R9 | bit |  |  |  |
| R10 | bit |  |  |  |
| R11 | bit |  |  |  |
| R12 | bit |  |  |  |
| CSA | varchar(2) |  |  |  |
| LST | varchar(1) |  |  |  |
| CDN | varchar(3) |  |  |  |
| STY | varchar(2) |  |  |  |
| EPT | varchar(2) |  |  |  |
| BAS | varchar(1) |  |  |  |
| CSC | varchar(1) |  |  |  |
| NEP | int |  |  |  |
| CWP | int |  |  |  |
| CWF | int |  |  |  |
| WA | varchar(1) |  |  |  |
| AB | varchar(1) |  |  |  |
| PEM | varchar(255) |  |  |  |
| FX | varchar(10) |  |  |  |
| TG | varchar(1) |  |  | COD LOC.TG (3 codes) |
| R13 | bit |  |  |  |
| GC | varchar(1) |  |  |  |
| ZX | varchar(4) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| U1 | varchar(3) |  |  |  |
| U2 | varchar(3) |  |  |  |
| U3 | varchar(3) |  |  |  |
| U4 | varchar(3) |  |  |  |
| U5 | varchar(3) |  |  |  |
| U6 | varchar(3) |  |  |  |
| U7 | varchar(3) |  |  |  |
| U8 | varchar(3) |  |  |  |
| T1 | varchar(2) |  |  |  |
| NSC | varchar(5) |  |  |  |
| R14 | bit |  |  |  |
| R15 | bit |  |  |  |
| R16 | bit |  |  |  |
| R17 | bit |  |  |  |
| R18 | bit |  |  |  |
| R19 | bit |  |  |  |
| R20 | bit |  |  |  |
| R21 | bit |  |  |  |
| R22 | bit |  |  |  |
| R23 | bit |  |  |  |
| R24 | bit |  |  |  |
| R25 | bit |  |  |  |
| DNR | bit |  |  |  |
| IID | int |  |  |  |
| TY | int |  |  |  |
| R26 | bit |  |  |  |
| DAW | smallint |  |  |  |
| DAL | smallint |  |  |  |
| NSD | datetime | yes |  |  |
| RC | varchar(2) |  |  |  |
| CBC | varchar(8) |  |  |  |
| CH | varchar(4) |  |  |  |
| FID | varchar(9) |  |  |  |
| FC | varchar(10) |  |  |  |
| QRS | varchar(2) |  |  |  |
| ACC | varchar(2) |  |  |  |
| WS | nvarchar(255) |  |  |  |
| CHS | nvarchar(2) |  |  |  |
| CT | nvarchar(2) |  |  |  |
| DTY | nvarchar(2) |  |  |  |
| NLP | nvarchar(2) |  |  |  |
| NDS | nvarchar(12) |  |  |  |
| ET | nvarchar(2) |  |  |  |
| PKT | nvarchar(2) |  |  |  |
| ECI | bit |  |  |  |
| STI | bit |  |  |  |
| PTI | bit |  |  |  |
| PSF | varbinary(max) | yes |  |  |
| DLF | varbinary(max) | yes |  |  |
| SNM | varchar(10) |  |  |  |
| EC | int |  |  |  |
| UW | bit |  |  |  |
| PADA | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| AP | bit |  |  |  |

## Referenced by (declared FKs)

- **ELO**: ELO.SC = LOC.CD
- **EXH**: EXH.SC = LOC.CD
- **LCN**: LCN.SC = LOC.CD
- **OBL**: OBL.SC = LOC.CD
- **PEI**: PEI.SCL = LOC.CD
- **SCG**: SCG.SC = LOC.CD
- **SPR**: SPR.SC = LOC.CD
- **SSA**: SSA.SSC = LOC.CD
- **SST**: SST.SSC = LOC.CD

## Used in views

`AUP_Teacher`, `AUP_student`, `CLEVER_SCHOOLS`, `CLEVER_SECTIONS`, `Google_Student_Accounts`, `Google_Student_Accounts_Daily`, `Google_Student_Accounts_Disable_If_No_Permission_Slip`, `Google_Student_Accounts_Enable_If_Permission_Slip`, `Google_Student_Accounts_Reset_All_Passwords`, `Google_Student_Accounts_Reset_Daily_Passwords`, `Naviance_Students`, `SEIS_Demographic`, `SLUSD_ALL_STUDENT_PORTAL_ACCOUNTS`, `SLUSD_AUTHORIZATIONS`, `SLUSD_DAILY_ENROLLMENT`, `SLUSD_Instructional_Minutes`, `SLUSD_Lersun_classes_AUP`, `SLUSD_Lersun_students_AUP`, `SLUSD_MISSING_PORTAL_ACCOUNTS`, `SLUSD_MISSING_PORTAL_ACCOUNTS_Elementary`, `SLUSD_MISSING_PORTAL_ACCOUNTS_Secondary`, `SLUSD_VPC_CODES`, `SLUSD_warm_body_count`, `SLUSD_warm_body_elementary_totals`, `llm_all_sections`, `llm_attendance_daily`, `llm_attendance_summary`, `llm_class_rosters`, `llm_course_enrollments`, `llm_discipline_incidents`, `llm_elementary_grades`, `llm_elementary_teachers`, `llm_elpac_scores`, `llm_frpm_status`, `llm_sed_status`, `llm_special_education`, `llm_special_programs`, `llm_staff_roster`, `llm_student_contacts`, `llm_student_demographics`, `llm_student_enrollment`, `llm_student_gpa`, `llm_student_grades`, `llm_student_program_summary`, `llm_suspension_summary`, `llm_teacher_courses`, `llm_test_scores`, `llm_test_scores_current`

## Used in saved reports

"CTE Test", "Elementary Daily Attendance", "Projected CALPADS UPP (%)", "Secondary SDC by Class >50%", "TBD EL Count - Student List", "TBD EL Count - Summary", "Terms: All Schools", "Terms: Summer Schools"
