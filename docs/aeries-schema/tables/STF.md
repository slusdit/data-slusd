# STF

Staff demographics (district-wide), keyed by staff ID.

Aeries: Contains CBEDS required demographic information about current staff members for State Reporting

Rows: 2,290 · Primary key: ID · Columns: 88

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  | Staff ID (TCH.ID) |  |
| FN | varchar(20) |  | First name |  |
| MN | varchar(20) |  | Middle name |  |
| LN | varchar(50) |  | Last name |  |
| LLN | nvarchar(100) |  |  |  |
| LFN | nvarchar(100) |  |  |  |
| LMN | nvarchar(100) |  |  |  |
| LSF | nvarchar(10) |  |  |  |
| LGN | varchar(1) |  |  |  |
| BY | smallint |  |  |  |
| TP | smallint |  |  |  |
| JC | varchar(2) |  |  | COD STF.JC (28 codes) |
| ELE | varchar(1) |  |  | COD STF.ELE (4 codes) |
| EL | varchar(2) |  |  | COD STF.EL (17 codes) |
| YDE | smallint |  |  |  |
| SX | varchar(1) |  | aka GENDER |  |
| EC | varchar(3) |  |  | COD STF.EC (18 codes) |
| EC2 | varchar(3) |  |  |  |
| EC3 | varchar(3) |  |  |  |
| EC4 | varchar(3) |  |  |  |
| EC5 | varchar(3) |  |  |  |
| HD | datetime | yes |  |  |
| PSD | smallint |  |  |  |
| PSO | smallint |  |  |  |
| LD | datetime | yes |  |  |
| PS | varchar(2) |  |  | COD STF.PS (4 codes) |
| TF | varchar(1) |  |  | COD STF.TF (2 codes) |
| IEL | varchar(1) |  |  | COD STF.IEL (4 codes) |
| SS | varchar(9) |  |  |  |
| AD | varchar(55) |  |  |  |
| CY | varchar(30) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| ZX | varchar(4) |  |  |  |
| TL | varchar(10) |  |  |  |
| ECN | varchar(50) |  |  |  |
| ETL | varchar(10) |  |  |  |
| U1 | varchar(2) |  |  | COD STF.U1 (2 codes) |
| U2 | varchar(2) |  |  | COD STF.U2 (2 codes) |
| U3 | varchar(2) |  |  |  |
| U4 | varchar(2) |  |  |  |
| U5 | varchar(2) |  |  |  |
| U6 | varchar(2) |  |  |  |
| U7 | varchar(2) |  |  |  |
| U8 | varchar(2) |  |  |  |
| EC6 | varchar(3) |  |  |  |
| TBD | datetime | yes |  |  |
| TBT | varchar(1) |  |  |  |
| TBM | varchar(2) |  |  |  |
| TBR | varchar(1) |  |  |  |
| TBE | datetime | yes |  |  |
| PSC | smallint |  | Primary school |  |
| TG | varchar(1) |  |  | COD STF.TG (2 codes) |
| TYS | smallint |  |  |  |
| TYD | smallint |  |  |  |
| DYI | datetime | yes |  |  |
| FNP | varchar(50) |  |  |  |
| MNP | varchar(50) |  |  |  |
| LNP | varchar(50) |  |  |  |
| BD | datetime | yes |  |  |
| SID | varchar(10) |  |  |  |
| ATL | varchar(10) |  |  |  |
| AEX | varchar(5) |  |  |  |
| EM | varchar(255) |  | Email |  |
| TI | varchar(100) |  | Title |  |
| IEX | varchar(8) |  |  |  |
| ETH | varchar(1) |  |  | COD STF.ETH (2 codes) |
| RC1 | varchar(3) |  |  | COD STF.RC1 (19 codes) |
| RC2 | varchar(3) |  |  |  |
| RC3 | varchar(3) |  |  |  |
| RC4 | varchar(3) |  |  |  |
| RC5 | varchar(3) |  |  |  |
| NID | varchar(255) |  |  |  |
| AEM | varchar(255) |  |  |  |
| HRID | varchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| CP | varchar(10) |  |  |  |
| NP | varchar(1) |  |  |  |
| SF | nvarchar(10) |  |  |  |
| PX | smallint |  |  |  |
| TX | smallint |  |  |  |
| TY | nvarchar(1) |  |  |  |
| ECC | nvarchar(2) |  |  |  |
| GN | nvarchar(1) |  |  |  |
| TIA | nvarchar(255) |  |  |  |
| TICY | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **ATR**: ATR.ID = STF.ID
- **SCH**: SCH.SID = STF.ID
- **SGS**: SGS.ID = STF.ID
- **SPC**: SPC.ID = STF.ID
- **SSI**: SSI.ID = STF.ID
- **TSD**: TSD.SID = STF.ID
- **TSO**: TSO.SID = STF.ID
- **STA**: STA.ID = STF.ID
- **STC**: STC.ID = STF.ID
- **STE**: STE.ID = STF.ID
- **STH**: STH.ID = STF.ID
- **STJ**: STJ.ID = STF.ID
- **TCH**: TCH.ID = STF.ID

## Used in views

`CLEVER_staff`, `ELLEVATION_ListPersonData`, `FOLLETT_PATRONS_STAFF`, `llm_all_sections`, `llm_class_rosters`, `llm_course_enrollments`, `llm_elementary_grades`, `llm_elementary_teachers`, `llm_staff_roster`, `llm_student_enrollment`, `llm_student_grades`, `llm_teacher_courses`, `llm_teacher_student_roster`

## Used in saved reports

"HR Category Test"
