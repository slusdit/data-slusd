# HIS

Course history / transcript: every course and mark a student has ever earned, including other schools.

Aeries: History of Grades given to a student, including those from other schools – Transcript Data

Rows: 1,066,581 · Primary key: PID, SQ · Columns: 38

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  | aka ID | FK → IDN.ID |
| CN | varchar(6) |  | Course number (CRS.CN) | FK → CRS.CN |
| MK | varchar(3) |  | Mark earned |  |
| CR | money |  | aka credits_attempted |  |
| GR | smallint |  | Grade level when taken |  |
| TE | smallint |  | Term the mark was earned in |  |
| YR | smallint |  | School year of the course |  |
| CO | varchar(30) |  | Course title as recorded |  |
| ST | int |  | School where the course was taken (CHI code or local school) | COD HIS.ST (9 codes); FK → CHI.SCH |
| CC | money |  | Credits completed |  |
| RT | varchar(1) |  |  | COD HIS.RT (1 codes) |
| CI | varchar(1) |  |  |  |
| SQ | smallint |  |  |  |
| EN | smallint |  |  |  |
| PR | smallint |  |  |  |
| TD | smallint |  |  |  |
| AB | smallint |  |  |  |
| EA | smallint |  |  |  |
| UA | smallint |  |  |  |
| SU | smallint |  |  |  |
| SE | smallint |  | aka semester |  |
| SID | int |  |  |  |
| HR | money |  |  |  |
| SRC | varchar(3) |  |  |  |
| SDE | int |  |  |  |
| ABG | varchar(1) |  |  |  |
| DC | datetime | yes |  |  |
| PF | nvarchar(2) |  |  |  |
| CH | money |  |  |  |
| AC | nvarchar(1) |  |  |  |
| SA | varchar(6) |  |  |  |
| AMK | nvarchar(3) |  |  |  |
| MAG | varchar(200) |  |  |  |
| MAA | bit |  |  |  |
| SSC | smallint |  |  |  |
| CTM | nvarchar(4) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: HIS.CN = CRS.CN
- declared FK → **IDN**: HIS.PID = IDN.ID
- declared FK → **CHI**: HIS.ST = CHI.SCH
- inferred → **CRS**: HIS.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **CHC**: CHC.PID = HIS.PID AND CHC.HSQ = HIS.SQ

## Used in views

`Naviance_Student_Courses`, `SLUSD_CSSB_ELA_HIS`, `SLUSD_CSSB_WORLD_LANG_HIS`, `SLUSD_MARKS_GRD_HIS`, `SLUSD_MARKS_HIS`, `XHIS`, `XHIS_LIST`

## Used in saved reports

"Transcript for Current Year"
