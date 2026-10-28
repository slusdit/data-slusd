# PGM

Special program participation per student, one row per program spell.

Aeries: Contains details of Special Programs in which students are participating

Rows: 46,088 · Primary key: PID, SQ · Columns: 34

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  | Student identifier | FK → IDN.ID |
| CD | varchar(3) |  | Program code (COD PGM.CD) | COD PGM.CD (28 codes) |
| ESD | datetime | yes | Eligibility start date |  |
| EED | datetime | yes | Eligibility end date |  |
| PSD | datetime | yes | Program start date |  |
| PED | datetime | yes | Program end date |  |
| ER | varchar(3) |  |  | COD PGM.ER (11 codes) |
| OP | varchar(3) |  |  |  |
| IS | varchar(3) |  |  |  |
| SR | varchar(160) |  |  | COD PGM.SR (174 codes) |
| CO | nvarchar(max) |  |  |  |
| YP | money |  |  |  |
| HR | money |  |  |  |
| TT | varchar(1) |  |  |  |
| ARI | varchar(1) |  |  |  |
| DS | varchar(1) |  |  |  |
| SQ | smallint |  |  |  |
| ST | varchar(2) |  |  | COD PGM.ST (3 codes) |
| EG | smallint |  |  |  |
| SCL | smallint |  |  |  |
| MP | varchar(3) |  |  |  |
| CPA | varchar(5) |  |  | COD PGM.CPA (1 codes) |
| HDT | varchar(3) |  |  |  |
| RA | varchar(1) |  |  |  |
| UY | varchar(1) |  |  |  |
| TY | varchar(3) |  |  |  |
| CRI | varchar(3) |  |  |  |
| FT | nvarchar(2) |  |  |  |
| PP | nvarchar(1) |  |  |  |
| ALP | nvarchar(2) |  |  |  |
| PYB | varchar(1) |  |  |  |
| TED | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: PGM.PID = IDN.ID

## Referenced by (declared FKs)

- **PGS**: PGS.PID = PGM.PID AND PGS.SQ = PGM.SQ

## Used in views

`Compass_Learning_Students`, `ELLEVATION_ListStudentDemoData`, `SLUSD_demographics`, `llm_special_programs`, `llm_student_program_summary`
