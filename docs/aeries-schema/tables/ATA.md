# ATA

Relationships of Student Numbers to Supplemental Attendance Session numbers

Rows: 975 · Primary key: ID, SQ · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  | FK → ATS.SC |
| SE | int |  |  | FK → ATS.SE |
| DS | datetime | yes |  |  |
| DE | datetime | yes |  |  |
| PR | varchar(3) |  |  |  |
| RA | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ATS**: ATA.SCL = ATS.SC AND ATA.SE = ATS.SE
- declared FK → **IDN**: ATA.ID = IDN.ID
- inferred → **STU**: ATA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
