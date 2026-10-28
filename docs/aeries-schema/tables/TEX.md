# TEX

Contains accommodations, modifications and info as to why a student missed a scheduled test

Rows: 13,428 · Primary key: PID, SQ · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| ID | varchar(8) |  |  | → STU |
| PT | smallint |  |  |  |
| GR | smallint |  |  |  |
| TD | datetime | yes |  |  |
| ERS | varchar(2) |  |  | COD TEX.ERS (9 codes) |
| PRB | varchar(2) |  |  | COD TEX.PRB (35 codes) |
| CMP | varchar(1) |  |  | COD TEX.CMP (3 codes) |
| AA | varchar(6) |  |  | COD TEX.AA (2 codes) |
| INC | varchar(1) |  |  | COD TEX.INC (6 codes) |
| SCL | smallint |  |  |  |
| SPC | varchar(6) |  |  |  |
| TA | varchar(6) |  |  |  |
| OTH | varchar(3) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: TEX.PID = IDN.ID
- inferred → **STU**: TEX.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
