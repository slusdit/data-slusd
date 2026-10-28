# TST

Standardized test score history per student.

Aeries: Contains a history of State and Local standardized test scores

Rows: 744,415 · Primary key: PID, SQ · Columns: 36

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  | Student identifier | FK → IDN.ID |
| ID | varchar(8) |  | Test ID (CTL.ID) | → STU |
| PT | smallint |  | Test part | COD TST.PT (13 codes) |
| GR | smallint |  | Grade when tested |  |
| DT | varchar(4) |  |  |  |
| CL | smallint |  |  |  |
| RS | smallint |  | Raw score |  |
| SS | smallint |  | Scale score |  |
| GE | smallint |  |  |  |
| PC | smallint |  |  |  |
| OT | smallint |  |  |  |
| ST | smallint |  |  |  |
| CE | smallint |  |  |  |
| TD | datetime | yes | Test date |  |
| PR | money |  | aka Percentile |  |
| PL | money |  | Performance level |  |
| RU | smallint |  |  |  |
| TA | varchar(6) |  | aka TestingAdministration |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| SRC | varchar(3) |  |  | COD TST.SRC (4 codes) |
| TY | varchar(3) |  | Test type | COD TST.TY (2 codes) |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| LX | int |  |  |  |
| QT | int |  |  |  |
| PI | money |  |  |  |
| PA1 | int |  |  |  |
| PA2 | int |  |  |  |
| PA3 | int |  |  |  |
| ELP | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: TST.PID = IDN.ID
- inferred → **STU**: TST.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Used in views

`ELLEVATION_ListTestScoreData`, `ELLEVATION_ListTestScoreData_ELPAC`, `SLUSD_CSSB_ELA_WL_PROFICIENCY`, `SLUSD_RLSTAR`, `llm_elpac_scores`, `llm_test_scores`, `llm_test_scores_current`
