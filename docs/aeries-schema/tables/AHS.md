# AHS

Attendance history summary per student per year: enrolled, present, absent, tardy counts.

Aeries: Stores a summary of student enrollment, present, absent and tardy counts by year

Rows: 141,869 · Primary key: ID, YR, SCL, SP, HS · Columns: 28

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| YR | varchar(9) |  |  |  |
| EN | smallint |  |  |  |
| PR | smallint |  |  |  |
| AB | smallint |  |  |  |
| AE | smallint |  |  |  |
| AU | smallint |  |  |  |
| TD | smallint |  |  |  |
| SCL | smallint |  |  |  |
| TRU | smallint |  |  |  |
| SU | smallint |  |  |  |
| ISC | smallint |  |  |  |
| ISI | smallint |  |  |  |
| ISS | smallint |  |  |  |
| PE | smallint |  |  |  |
| PA | smallint |  |  |  |
| POS | smallint |  |  |  |
| PIS | smallint |  |  |  |
| PAX | smallint |  |  |  |
| PAU | smallint |  |  |  |
| PIC | smallint |  |  |  |
| PIN | smallint |  |  |  |
| SP | varchar(1) |  |  |  |
| HS | smallint |  |  |  |
| RA | smallint |  |  |  |
| RS | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: AHS.ID = IDN.ID
- inferred → **STU**: AHS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Used in views

`SLUSD_attendance_Rates_by_program`
