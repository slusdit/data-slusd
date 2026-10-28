# ARH

Student Hourly CTE details for TX Attendance Reporting

Rows: 0 · Primary key: (none declared) · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RP | smallint |  |  |  |
| SCL | smallint |  |  |  |
| DT | datetime | yes |  |  |
| PR | varchar(3) |  |  |  |
| HR | money |  |  |  |
| SVC | nvarchar(8) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ARH.ID = IDN.ID
- inferred → **STU**: ARH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
