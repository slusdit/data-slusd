# ARD

Student Attendance details for TX Attendance Reporting

Rows: 0 · Primary key: (none declared) · Columns: 16

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
| PR | varchar(255) |  |  |  |
| CD | varchar(6) |  |  |  |
| ELG | money |  |  |  |
| CNH | money |  |  |  |
| ECH | money |  |  |  |
| FTE | money |  |  |  |
| SVC | nvarchar(8) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ARD.ID = IDN.ID
- inferred → **STU**: ARD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
