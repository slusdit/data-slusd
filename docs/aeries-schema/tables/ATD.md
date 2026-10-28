# ATD

Supplemental Attendance tracking includes times in and out and total minutes by student

Rows: 4,895 · Primary key: ID, SQ · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  | FK → ATS.SC |
| SE | int |  |  | FK → ATS.SE |
| DT | datetime |  |  |  |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| TM | smallint |  |  |  |
| CO | nvarchar(max) |  |  |  |
| CD | varchar(3) |  |  |  |
| ARH | money |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| EID | int | yes |  |  |

## Joins

- declared FK → **ATS**: ATD.SCL = ATS.SC AND ATD.SE = ATS.SE
- declared FK → **IDN**: ATD.ID = IDN.ID
- inferred → **STU**: ATD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
