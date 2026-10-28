# DAY

School calendar, one row per calendar day per school. HO = '' marks an instructional day.

Aeries: Attendance Calendar – Can be DISTRICT MANAGED

Rows: 6,160 · Primary key: SC, DY · Columns: 174

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code | → LOC |
| DY | smallint |  | Day number within the school year |  |
| DT | datetime | yes | Calendar date |  |
| HO | varchar(1) |  | Holiday / non-school indicator; blank = school day |  |
| MO | smallint |  | Month number in the attendance calendar |  |
| T1 | varchar(1) |  | Track 1 in-session flag |  |
| T2 | varchar(1) |  | Track 2 in-session flag |  |
| T3 | varchar(1) |  |  |  |
| T4 | varchar(1) |  |  |  |
| T5 | varchar(1) |  |  |  |
| T6 | varchar(1) |  |  |  |
| AP | smallint |  |  |  |
| EN | smallint |  |  |  |
| BL | varchar(10) |  | Bell schedule / periods in session |  |
| AB | varchar(1) |  |  |  |
| ML | bit |  |  |  |
| T7 | varchar(1) |  |  |  |
| T8 | varchar(1) |  |  |  |
| T9 | varchar(1) |  |  |  |
| T10 | varchar(1) |  |  |  |
| T11 | varchar(1) |  |  |  |
| T12 | varchar(1) |  |  |  |
| T13 | varchar(1) |  |  |  |
| T14 | varchar(1) |  |  |  |
| T15 | varchar(1) |  |  |  |
| T16 | varchar(1) |  |  |  |
| T17 | varchar(1) |  |  |  |
| T18 | varchar(1) |  |  |  |
| T19 | varchar(1) |  |  |  |
| T20 | varchar(1) |  |  |  |
| T21 | varchar(1) |  |  |  |
| T22 | varchar(1) |  |  |  |
| T23 | varchar(1) |  |  |  |
| T24 | varchar(1) |  |  |  |
| T25 | varchar(1) |  |  |  |
| T26 | varchar(1) |  |  |  |
| PD | varchar(1) |  |  |  |
| WC | varchar(2) |  |  |  |
| W1 | varchar(2) |  |  |  |
| W2 | varchar(2) |  |  |  |
| W3 | varchar(2) |  |  |  |
| W4 | varchar(2) |  |  |  |
| W5 | varchar(2) |  |  |  |
| W6 | varchar(2) |  |  |  |
| W7 | varchar(2) |  |  |  |
| W8 | varchar(2) |  |  |  |
| W9 | varchar(2) |  |  |  |
| W10 | varchar(2) |  |  |  |
| W11 | varchar(2) |  |  |  |
| W12 | varchar(2) |  |  |  |
| W13 | varchar(2) |  |  |  |
| W14 | varchar(2) |  |  |  |
| W15 | varchar(2) |  |  |  |
| W16 | varchar(2) |  |  |  |
| W17 | varchar(2) |  |  |  |
| W18 | varchar(2) |  |  |  |
| W19 | varchar(2) |  |  |  |
| W20 | varchar(2) |  |  |  |
| W21 | varchar(2) |  |  |  |
| W22 | varchar(2) |  |  |  |
| W23 | varchar(2) |  |  |  |
| W24 | varchar(2) |  |  |  |
| W25 | varchar(2) |  |  |  |
| W26 | varchar(2) |  |  |  |
| WM | smallint |  |  |  |
| M1 | smallint |  |  |  |
| M2 | smallint |  |  |  |
| M3 | smallint |  |  |  |
| M4 | smallint |  |  |  |
| M5 | smallint |  |  |  |
| M6 | smallint |  |  |  |
| M7 | smallint |  |  |  |
| M8 | smallint |  |  |  |
| M9 | smallint |  |  |  |
| M10 | smallint |  |  |  |
| M11 | smallint |  |  |  |
| M12 | smallint |  |  |  |
| M13 | smallint |  |  |  |
| M14 | smallint |  |  |  |
| M15 | smallint |  |  |  |
| M16 | smallint |  |  |  |
| M17 | smallint |  |  |  |
| M18 | smallint |  |  |  |
| M19 | smallint |  |  |  |
| M20 | smallint |  |  |  |
| M21 | smallint |  |  |  |
| M22 | smallint |  |  |  |
| M23 | smallint |  |  |  |
| M24 | smallint |  |  |  |
| M25 | smallint |  |  |  |
| M26 | smallint |  |  |  |
| R1 | smallint |  |  |  |
| R2 | smallint |  |  |  |
| R3 | smallint |  |  |  |
| R4 | smallint |  |  |  |
| R5 | smallint |  |  |  |
| R6 | smallint |  |  |  |
| R7 | smallint |  |  |  |
| R8 | smallint |  |  |  |
| R9 | smallint |  |  |  |
| R10 | smallint |  |  |  |
| R11 | smallint |  |  |  |
| R12 | smallint |  |  |  |
| R13 | smallint |  |  |  |
| R14 | smallint |  |  |  |
| R15 | smallint |  |  |  |
| R16 | smallint |  |  |  |
| R17 | smallint |  |  |  |
| R18 | smallint |  |  |  |
| R19 | smallint |  |  |  |
| R20 | smallint |  |  |  |
| R21 | smallint |  |  |  |
| R22 | smallint |  |  |  |
| R23 | smallint |  |  |  |
| R24 | smallint |  |  |  |
| R25 | smallint |  |  |  |
| R26 | smallint |  |  |  |
| O1 | smallint |  |  |  |
| O2 | smallint |  |  |  |
| O3 | smallint |  |  |  |
| O4 | smallint |  |  |  |
| O5 | smallint |  |  |  |
| O6 | smallint |  |  |  |
| O7 | smallint |  |  |  |
| O8 | smallint |  |  |  |
| O9 | smallint |  |  |  |
| O10 | smallint |  |  |  |
| O11 | smallint |  |  |  |
| O12 | smallint |  |  |  |
| O13 | smallint |  |  |  |
| O14 | smallint |  |  |  |
| O15 | smallint |  |  |  |
| O16 | smallint |  |  |  |
| O17 | smallint |  |  |  |
| O18 | smallint |  |  |  |
| O19 | smallint |  |  |  |
| O20 | smallint |  |  |  |
| O21 | smallint |  |  |  |
| O22 | smallint |  |  |  |
| O23 | smallint |  |  |  |
| O24 | smallint |  |  |  |
| O25 | smallint |  |  |  |
| O26 | smallint |  |  |  |
| I1 | smallint |  |  |  |
| I2 | smallint |  |  |  |
| I3 | smallint |  |  |  |
| I4 | smallint |  |  |  |
| I5 | smallint |  |  |  |
| I6 | smallint |  |  |  |
| I7 | smallint |  |  |  |
| I8 | smallint |  |  |  |
| I9 | smallint |  |  |  |
| I10 | smallint |  |  |  |
| I11 | smallint |  |  |  |
| I12 | smallint |  |  |  |
| I13 | smallint |  |  |  |
| I14 | smallint |  |  |  |
| I15 | smallint |  |  |  |
| I16 | smallint |  |  |  |
| I17 | smallint |  |  |  |
| I18 | smallint |  |  |  |
| I19 | smallint |  |  |  |
| I20 | smallint |  |  |  |
| I21 | smallint |  |  |  |
| I22 | smallint |  |  |  |
| I23 | smallint |  |  |  |
| I24 | smallint |  |  |  |
| I25 | smallint |  |  |  |
| I26 | smallint |  |  |  |
| BS | int |  |  |  |
| PAT | datetime | yes |  |  |
| SAT | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: DAY.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **ATT**: ATT.SC = DAY.SC AND ATT.DY = DAY.DY
- **BEL**: BEL.SC = DAY.SC AND BEL.DY = DAY.DY

## Used in views

`SLUSD_AUTHORIZATIONS`, `SLUSD_CSSB_ELA_HIS`, `SLUSD_CSSB_WORLD_LANG_HIS`, `SLUSD_DAILY_ENROLLMENT`, `SLUSD_MARKS_GRD`, `SLUSD_MARKS_GRD_HIS`, `SLUSD_MARKS_HIS`, `SLUSD_Secondary_MOU_All_Data`, `SLUSD_Secondary_MOU_Overage_Only`, `SLUSD_SpED_Suspensions`, `SLUSD_demographics`, `SLUSD_eTrition`, `SLUSD_eTrition_Hosted_Aeries`, `SLUSD_elementary_daily_attendance`, `SLUSD_secondary_student_absences`, `SLUSD_secondary_student_all_day_absences`, `SLUSD_warm_body_elementary_totals`, `SLUSD_warmbody_secondary_absences`, `SLUSD_warmbody_secondary_enrollment`, `XHIS`, `XHIS_LIST`, `llm_attendance_summary`

## Used in saved reports

"Elementary Daily Attendance", "Transcript for Current Year"
