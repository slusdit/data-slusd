# SUP

Supplemental student fields defined by the district (column meanings are district-specific).

Aeries: Supplemental Student demographics (up to 150 District developed fields)

Rows: 19,970 · Primary key: SC, SN · Columns: 50

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| MM | varchar(20) |  |  |  |
| ME | varchar(16) |  | M-Employer |  |
| FF | varchar(20) |  |  |  |
| FE | varchar(16) |  | F-Employer |  |
| 1C | varchar(20) |  | *Emerg Contact 1 |  |
| 1R | varchar(3) |  | Rel |  |
| 1P | varchar(10) |  | Emerg Phone |  |
| 2C | varchar(18) |  | *Emerg Contact 2 |  |
| 2R | varchar(3) |  | Rel |  |
| 2P | varchar(10) |  | Emergncy Phone |  |
| RX | varchar(1) |  | Rx! |  |
| LG | varchar(3) |  | Lng |  |
| LP | varchar(1) |  | /P |  |
| PM | varchar(3) |  | Pgm |  |
| H1 | varchar(2) |  | H1 |  |
| H2 | varchar(2) |  | H2 |  |
| H3 | varchar(2) |  | H3 |  |
| IN | varchar(1) |  | En |  |
| LV | varchar(1) |  | Lv |  |
| FL | varchar(1) |  | Fl/ |  |
| AF | varchar(1) |  | Af |  |
| TN | varchar(1) |  | Trn | → TCH |
| RT | varchar(1) |  | Rt |  |
| DC | varchar(1) |  | Dc |  |
| A1 | varchar(1) |  | A1 |  |
| A2 | varchar(1) |  | A2 |  |
| A3 | varchar(1) |  | A3 |  |
| A4 | varchar(1) |  | A4 |  |
| GC | varchar(2) |  | Gc |  |
| YY | varchar(5) |  | User Data |  |
| TAR | varchar(1) | yes | TARI |  |
| DEL | bit | yes |  |  |
| DTS | datetime | yes |  |  |
| ARD | int | yes |  | COD SUP.ARD (9 codes) |
| IEP | varchar(1) |  |  | COD SUP.IEP (5 codes) |
| C504 | varchar(1) |  |  | COD SUP.C504 (2 codes) |
| BIL | varchar(1) |  |  | COD SUP.BIL (3 codes) |
| GAT | varchar(1) |  |  | COD SUP.GAT (2 codes) |
| PAS | varchar(1) |  |  | COD SUP.PAS (2 codes) |
| MEN | varchar(2) |  |  | COD SUP.MEN (12 codes) |
| YEN | varchar(4) |  |  |  |
| SPED | varchar(1) |  |  | COD SUP.SPED (2 codes) |
| WSC | varchar(3) |  |  | COD SUP.WSC (12 codes) |
| WLG | varchar(2) |  |  | COD SUP.WLG (15 codes) |
| MI | varchar(1) | yes | Medical Insurance |  |
| USERNAME | varchar(50) | yes | UserAccount |  |
| UN | varchar(50) | yes | Student Username |  |
| GM | varchar(1) | yes | Gmail Permission | COD SUP.GM (6 codes) |

## Joins

- declared FK → **STU**: SUP.SC = STU.SC AND SUP.SN = STU.SN
- inferred → **STU**: SUP.SC = STU.SC AND SUP.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **TCH**: SUP.SC = TCH.SC AND SUP.TN = TCH.TN (teacher number)
- inferred → **LOC**: SUP.SC = LOC.CD (school code)

## Used in views

`AUP_student`, `CLEVER_STUDENTS`, `Compass_Learning_Students`, `Discovery_Education_Students`, `ELLEVATION_ListStudentDemoData`, `Emergency_Cards_Elementary_English`, `Emergency_Cards_Elementary_Spanish`, `FOOD_SERVICE_CUSTOMERS`, `Google_Student_Accounts`, `Google_Student_Accounts_Daily`, `Google_Student_Accounts_Disable_If_No_Permission_Slip`, `Google_Student_Accounts_Enable_If_Permission_Slip`, `Google_Student_Accounts_Reset_All_Passwords`, `Google_Student_Accounts_Reset_Daily_Passwords`, `Illuminate_Student_Accounts`, `Naviance_Parents`, `Naviance_Students`, `SEIS_Demographic`, `SLUSD_Edgenuity_Students`, `SLUSD_MARKS_GRD_HIS`, `SLUSD_NEW_YEAR_PROJECTION`, `SLUSD_SpED_Suspensions`, `SLUSD_demographics`, `SLUSD_eTrition`, `SLUSD_elementary_demographics`, `SLUSD_secondary_demographics`

## Used in saved reports

"AP Courses By Ethnicity", "AP Courses by Ethnicity(%)", "Gmail Account Status by School", "Grade Distribution", "Teacher Marks Comparison"
