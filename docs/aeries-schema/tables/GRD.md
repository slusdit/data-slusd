# GRD

Current-year grade reporting marks, one row per student per section.

Aeries: Contains Grades given to Students for Grade Reporting

Rows: 29,112 · Primary key: SC, SN, PD, CN, TN, SE · Columns: 65

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code | FK → STU.SC, TCH.SC |
| SN | int |  | Student number | FK → STU.SN |
| PD | smallint |  | Period |  |
| CN | varchar(6) |  | Course number (CRS.CN) | FK → CRS.CN |
| TN | smallint |  | Teacher number (TCH.TN) | FK → TCH.TN |
| MK | nvarchar(3) |  | Final grade | COD GRD.MK (14 codes) |
| M1 | nvarchar(3) |  | Mark for grade reporting window 1 (progress report at SLUSD secondary schools) |  |
| M2 | nvarchar(3) |  | Mark for window 2 (Q1 at SLUSD secondary schools) |  |
| M3 | nvarchar(3) |  | Mark for window 3 |  |
| M4 | nvarchar(3) |  | Mark for window 4 |  |
| M5 | nvarchar(3) |  | Mark for window 5 |  |
| M6 | nvarchar(3) |  | Mark for window 6 |  |
| M7 | nvarchar(3) |  | Mark for window 7 |  |
| M8 | nvarchar(3) |  | Mark for window 8 |  |
| M9 | nvarchar(3) |  |  |  |
| M10 | nvarchar(3) |  |  |  |
| M11 | nvarchar(3) |  |  |  |
| M12 | nvarchar(3) |  |  |  |
| CR | money |  | Credits |  |
| C1 | nvarchar(2) |  | Comment code 1 | COD GRD.C1 (33 codes) |
| C2 | nvarchar(2) |  | Comment code 2 |  |
| C3 | nvarchar(2) |  | Comment code 3 |  |
| CI | nvarchar(1) |  | Citizenship indicator | COD GRD.CI (4 codes) |
| WH | nvarchar(1) |  |  | COD GRD.WH (4 codes) |
| TG | nvarchar(1) |  |  |  |
| SH | smallint |  |  |  |
| LI | smallint |  |  |  |
| PT | nvarchar(1) |  |  |  |
| PL | smallint |  |  |  |
| TM | smallint |  |  |  |
| SE | smallint |  | Section number (MST.SE) | → MST |
| BL | smallint |  |  |  |
| EN | smallint |  |  |  |
| PR | smallint |  |  |  |
| AB | smallint |  |  |  |
| TD | smallint |  |  |  |
| EA | smallint |  |  |  |
| UA | smallint |  |  |  |
| SU | smallint |  |  |  |
| CO | nvarchar(max) |  | Grade comments |  |
| HR | money |  |  |  |
| TN2 | smallint |  |  |  |
| TN3 | smallint |  |  |  |
| ABG | varchar(1) |  |  |  |
| S1 | smallint |  |  |  |
| S2 | smallint |  |  |  |
| S3 | smallint |  |  |  |
| S4 | smallint |  |  |  |
| S5 | smallint |  |  |  |
| S6 | smallint |  |  |  |
| S7 | smallint |  |  |  |
| S8 | smallint |  |  |  |
| S9 | smallint |  |  |  |
| S10 | smallint |  |  |  |
| S11 | smallint |  |  |  |
| S12 | smallint |  |  |  |
| SID | int |  | Student identifier |  |
| FYO | bit |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: GRD.CN = CRS.CN
- declared FK → **STU**: GRD.SC = STU.SC AND GRD.SN = STU.SN
- declared FK → **TCH**: GRD.SC = TCH.SC AND GRD.TN = TCH.TN
- inferred → **STU**: GRD.SC = STU.SC AND GRD.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: GRD.SC = MST.SC AND GRD.SE = MST.SE (section number)
- inferred → **CRS**: GRD.CN = CRS.CN (course number)
- inferred → **TCH**: GRD.SC = TCH.SC AND GRD.TN = TCH.TN (teacher number)
- inferred → **LOC**: GRD.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **GRH**: GRH.SC = GRD.SC AND GRH.SN = GRD.SN AND GRH.PD = GRD.PD AND GRH.CN = GRD.CN AND GRH.TN = GRD.TN AND GRH.SE = GRD.SE
- **GRS**: GRS.SC = GRD.SC AND GRS.SN = GRD.SN AND GRS.PD = GRD.PD AND GRS.CN = GRD.CN AND GRS.TN = GRD.TN AND GRS.SE = GRD.SE

## Used in views

`MIISS_DandF`, `SLUSD_MARKS_GRD`, `SLUSD_MARKS_GRD_HIS`, `change_in_gpa_q1_to_q2`, `llm_student_gpa`, `llm_student_grades`, `slusd_grades`, `slusd_grades_COVID19`

## Used in saved reports

"SLHS Q1 Grade reporting"
