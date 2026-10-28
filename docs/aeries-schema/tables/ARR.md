# ARR

Student Remote attendance details for TX Attendance Reporting

Rows: 0 · Primary key: (none declared) · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RP | smallint |  |  |  |
| SCL | smallint |  |  |  |
| TR | varchar(1) |  |  |  |
| CD | varchar(5) |  |  |  |
| VL | varchar(255) |  |  |  |
| GR | smallint |  |  |  |
| INS | varchar(2) |  |  |  |
| SVC | nvarchar(8) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ARR.ID = IDN.ID
- inferred → **STU**: ARR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
