# ARS

Campus/District Summary details for TX Attendance Reporting

Rows: 0 · Primary key: (none declared) · Columns: 56

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RP | smallint |  |  |  |
| SCL | smallint |  |  |  |
| TR | varchar(1) |  |  |  |
| GR | smallint |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| DT | smallint |  |  |  |
| ELG | money |  |  |  |
| MBR | money |  |  |  |
| ABS | money |  |  |  |
| PRS | money |  |  |  |
| INE | money |  |  |  |
| EDB | money |  |  |  |
| EDP | money |  |  |  |
| EDM | money |  |  |  |
| EI | nvarchar(3) |  |  |  |
| BE | nvarchar(6) |  |  |  |
| RD | nvarchar(6) |  |  |  |
| INS | nvarchar(6) |  |  |  |
| ECH | money |  |  |  |
| MP | money |  |  |  |
| MI | money |  |  |  |
| ME | money |  |  |  |
| DS | nvarchar(6) |  |  |  |
| FA | nvarchar(6) |  |  |  |
| CD | nvarchar(6) |  |  |  |
| BP | nvarchar(6) |  |  |  |
| EP | nvarchar(6) |  |  |  |
| GT | bit |  |  |  |
| ADA | money |  |  |  |
| MPO | money |  |  |  |
| MPH | money |  |  |  |
| MIO | money |  |  |  |
| MIH | money |  |  |  |
| EDC | varchar(6) |  |  |  |
| EDB1 | money |  |  |  |
| EDB2 | money |  |  |  |
| EDB3 | money |  |  |  |
| EDE1 | money |  |  |  |
| EDE2 | money |  |  |  |
| EDE3 | money |  |  |  |
| EDRF | money |  |  |  |
| ELIP | money |  |  |  |
| ELRA | money |  |  |  |
| ELRS | money |  |  |  |
| INIP | money |  |  |  |
| INRA | money |  |  |  |
| INRS | money |  |  |  |
| SVC | nvarchar(8) |  |  |  |
| PF1 | varchar(6) |  |  |  |
| PF2 | varchar(6) |  |  |  |
| PTC | varchar(6) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| CTI | nvarchar(6) |  |  |  |

## Joins

- declared FK → **IDN**: ARS.ID = IDN.ID
- inferred → **STU**: ARS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
