# CSE

Special education record per student (district managed).

Aeries: Special Education Demographic Information – Can be DISTRICT MANAGED

Rows: 1,612 · Primary key: ID · Columns: 147

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  | Permanent ID | FK → IDN.ID |
| SC | smallint |  |  | → STU, MST, TCH, LOC |
| SN | int |  |  | → STU |
| SE | varchar(4) |  |  | COD CSE.SE (124 codes); → MST |
| SF | varchar(4) |  |  |  |
| DS | varchar(7) |  |  |  |
| DR | varchar(7) |  |  |  |
| SS | varchar(9) |  |  |  |
| TY | varchar(2) |  |  | COD CSE.TY (32 codes) |
| MI | varchar(1) |  |  |  |
| RS | varchar(3) |  |  | COD CSE.RS (9 codes) |
| ED | datetime | yes | Special ed entry date |  |
| LI | datetime | yes |  |  |
| LA | datetime | yes | Last assessment date |  |
| HC | varchar(3) |  |  |  |
| PL | varchar(3) |  | Placement code | COD CSE.PL (16 codes) |
| IS | varchar(3) |  |  | COD CSE.IS (3 codes) |
| MS | varchar(2) |  |  |  |
| RI | varchar(1) |  |  |  |
| TS | varchar(2) |  |  |  |
| D1 | varchar(2) |  |  |  |
| D2 | varchar(2) |  |  |  |
| D3 | varchar(2) |  |  |  |
| D4 | varchar(2) |  |  |  |
| XD | datetime | yes | Special ed exit date |  |
| XR | varchar(2) |  |  | COD CSE.XR (10 codes) |
| EC | varchar(3) |  |  |  |
| RD | datetime | yes | Review date |  |
| SL | varchar(1) |  |  |  |
| OR | varchar(3) |  |  |  |
| TD | datetime | yes |  |  |
| WA | varchar(1) |  |  |  |
| PA | varchar(2) |  |  | COD CSE.PA (9 codes) |
| AA | varchar(1) |  |  |  |
| DI | varchar(3) |  | Primary disability code (COD CSE.DI) | COD CSE.DI (14 codes) |
| PS | varchar(2) |  |  | COD CSE.PS (8 codes) |
| LT | varchar(5) |  |  |  |
| LL | varchar(50) |  |  |  |
| LF | varchar(50) |  |  |  |
| LY | varchar(3) |  |  |  |
| AD | datetime | yes | Assessment date |  |
| TA | datetime | yes |  |  |
| SO | int |  |  |  |
| GR | smallint |  |  | COD CSE.GR (17 codes) |
| LE | varchar(1) |  |  |  |
| HL | varchar(2) |  |  |  |
| TN | smallint |  |  | → TCH |
| U1 | varchar(1) |  |  |  |
| U2 | varchar(1) |  |  |  |
| U3 | varchar(1) |  |  |  |
| U4 | varchar(1) |  |  |  |
| U5 | varchar(1) |  |  |  |
| U6 | varchar(1) |  |  |  |
| U7 | varchar(2) |  |  |  |
| U8 | varchar(2) |  |  |  |
| U9 | varchar(2) |  |  |  |
| U10 | varchar(2) |  |  |  |
| U11 | varchar(2) |  |  |  |
| U12 | varchar(2) |  |  |  |
| DT | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| IN | varchar(1) |  |  |  |
| ELL | varchar(1) |  |  |  |
| PT | varchar(3) |  |  |  |
| TL | varchar(1) |  |  |  |
| IPR | varchar(255) |  |  |  |
| IFR | varchar(255) |  |  |  |
| LIF | datetime | yes |  |  |
| TSE | varchar(2) |  |  | COD CSE.TSE (5 codes) |
| MEL | varchar(1) |  |  |  |
| ML | varchar(1) |  |  |  |
| NL | varchar(2) |  |  |  |
| EI | varchar(1) |  |  |  |
| RB | varchar(2) |  |  |  |
| PC | datetime | yes |  |  |
| IE | datetime | yes |  |  |
| DI2 | varchar(3) |  |  |  |
| FI | varchar(3) |  |  |  |
| FP | varchar(3) |  |  |  |
| FS | varchar(3) |  |  |  |
| IRC | varchar(3) |  |  |  |
| TG1 | varchar(3) |  |  |  |
| TG2 | varchar(3) |  |  |  |
| TG3 | varchar(3) |  |  |  |
| TG4 | varchar(3) |  |  |  |
| ST | varchar(1) |  |  |  |
| GP | varchar(2) |  |  |  |
| PSP | varchar(3) |  |  | COD CSE.PSP (1 codes) |
| PSE | varchar(2) |  |  |  |
| PA2 | varchar(2) |  |  |  |
| PA3 | varchar(2) |  |  |  |
| PA4 | varchar(2) |  |  |  |
| IRD | datetime | yes |  |  |
| IRB | varchar(2) |  |  |  |
| IPC | datetime | yes |  |  |
| IIE | datetime | yes |  |  |
| PA5 | varchar(2) |  |  |  |
| PA6 | varchar(2) |  |  |  |
| PA7 | varchar(2) |  |  |  |
| EDL | varchar(2) |  |  |  |
| BDL | varchar(2) |  |  |  |
| LU | datetime | yes |  |  |
| PI | varchar(2) |  |  |  |
| ETH | varchar(3) |  |  |  |
| TR1 | varchar(2) |  |  |  |
| TR2 | varchar(2) |  |  |  |
| TR3 | varchar(2) |  |  |  |
| TR4 | varchar(2) |  |  |  |
| TR5 | varchar(2) |  |  |  |
| TR6 | varchar(2) |  |  |  |
| TR7 | varchar(2) |  |  |  |
| TR8 | varchar(2) |  |  |  |
| PAC | varchar(1) |  |  |  |
| XY | varchar(1) |  |  |  |
| SI | int |  |  |  |
| IDL | varchar(2) |  |  |  |
| TDL | varchar(2) |  |  |  |
| EV | varchar(1) |  |  |  |
| SEI | nvarchar(50) |  |  |  |
| DI3 | varchar(3) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| IC | varchar(1) |  |  |  |
| PSI | nvarchar(3) |  |  | COD CSE.PSI (2 codes) |
| SWD | varchar(1) |  |  |  |
| SEV | int |  |  |  |
| END | datetime | yes |  |  |
| ETC | datetime | yes |  |  |
| EDD | datetime | yes |  |  |
| EDC | varchar(2) |  |  |  |
| DDS | varchar(4) |  |  |  |
| EO | varchar(2) |  |  |  |
| MA | varchar(2) |  |  |  |
| SNP | varchar(2) |  |  |  |
| SPR | varchar(1) |  |  |  |
| SES | varchar(1) |  |  |  |
| OED | datetime | yes |  |  |
| EDA | int |  |  |  |
| AMD | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| EDR | varchar(2) |  |  |  |
| RNS | varchar(6) |  |  |  |
| ERI | bit |  |  |  |

## Joins

- declared FK → **IDN**: CSE.ID = IDN.ID
- inferred → **STU**: CSE.SC = STU.SC AND CSE.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: CSE.SC = MST.SC AND CSE.SE = MST.SE (section number)
- inferred → **TCH**: CSE.SC = TCH.SC AND CSE.TN = TCH.TN (teacher number)
- inferred → **LOC**: CSE.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **CSA**: CSA.ID = CSE.ID
- **CSD**: CSD.ID = CSE.ID
- **CSH**: CSH.ID = CSE.ID
- **CSI**: CSI.ID = CSE.ID
- **CSS**: CSS.ID = CSE.ID
- **CSV**: CSV.ID = CSE.ID
- **DHS**: DHS.ID = CSE.ID

## Used in views

`ELLEVATION_ListStudentDemoData`, `SEIS_Demographic`, `SLUSD_NEW_YEAR_PROJECTION`, `SLUSD_NEW_YEAR_PROJECTION_CURRENT_YEAR`, `SLUSD_SpED_Suspensions`, `SLUSD_demographics`, `SLUSD_elementary_demographics`, `SLUSD_secondary_demographics`, `llm_special_education`, `llm_student_program_summary`

## Used in saved reports

"Enrollment by grade (SDC)", "SDC Enrollment % by Grade (ADA)", "Secondary SDC by Class >50%"
