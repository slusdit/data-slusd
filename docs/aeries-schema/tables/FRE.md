# FRE

Free / reduced meal application status per student.

Aeries: Contains data for Students whose parents have applied for Free or Reduced meals - Can be DISTRICT MANAGED.

Rows: 75,637 · Primary key: ID, SQ · Columns: 39

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  | Student identifier | FK → IDN.ID |
| SQ | smallint |  |  |  |
| FS | varchar(15) |  |  |  |
| AF | varchar(12) |  |  |  |
| FC | varchar(1) |  | FRPM code |  |
| NO | smallint |  |  |  |
| YR | money |  |  |  |
| MO | money |  |  |  |
| WK | money |  |  |  |
| NM | varchar(30) |  |  |  |
| SS | varchar(10) |  |  |  |
| DT | datetime | yes |  |  |
| CD | varchar(1) |  | Eligibility code (F = free, R = reduced, N = not eligible) | COD FRE.CD (7 codes) |
| UC | varchar(3) |  |  |  |
| EC | varchar(1) |  |  |  |
| MD | datetime | yes |  |  |
| DR | datetime | yes |  |  |
| DP | bit |  |  |  |
| ESD | datetime | yes | Effective start date |  |
| EED | datetime | yes |  |  |
| PSD | datetime | yes |  |  |
| PED | datetime | yes |  |  |
| MSD | datetime | yes |  |  |
| MXD | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| U2 | varchar(3) |  |  |  |
| U3 | varchar(3) |  |  |  |
| U4 | varchar(3) |  |  |  |
| U5 | varchar(3) |  |  |  |
| U6 | varchar(3) |  |  |  |
| U7 | varchar(3) |  |  |  |
| U8 | varchar(3) |  |  |  |
| SCL | smallint |  |  |  |
| SRC | varchar(3) |  |  | COD FRE.SRC (19 codes) |
| PIR | smallint |  |  |  |
| PDT | datetime | yes |  |  |
| CTR | nvarchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FRE.ID = IDN.ID
- inferred → **STU**: FRE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Used in views

`FOOD_SERVICE_CUSTOMERS`, `SLUSD_eTrition`, `llm_frpm_status`, `llm_sed_status`

## Used in saved reports

"AVID NSLP", "Projected CALPADS UPP (%)", "Total Enrollment by NSLP(%) (Interdistrict and SDC included)"
