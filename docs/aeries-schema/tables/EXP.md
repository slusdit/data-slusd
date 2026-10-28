# EXP

Stores details for student expulsions.

Rows: 1,135 · Primary key: PID, SQ · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → ADS.PID |
| SQ | smallint |  |  | FK → ADS.SQ |
| SED | datetime | yes |  |  |
| BHD | datetime | yes |  |  |
| CHD | datetime | yes |  |  |
| CCP | varchar(100) |  |  |  |
| EXD | datetime | yes |  |  |
| U1 | varchar(2) |  |  |  |
| U2 | varchar(2) |  |  |  |
| U3 | varchar(2) |  |  |  |
| U4 | varchar(2) |  |  |  |
| U5 | varchar(2) |  |  |  |
| U6 | varchar(2) |  |  |  |
| U7 | varchar(2) |  |  |  |
| U8 | varchar(2) |  |  |  |
| ERD | datetime | yes |  |  |
| XRD | datetime | yes |  |  |
| EMC | varchar(1) |  |  | COD EXP.EMC (3 codes) |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ADS**: EXP.PID = ADS.PID AND EXP.SQ = ADS.SQ
