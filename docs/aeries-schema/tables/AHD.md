# AHD

Stores a detailed history of student attendance counts by code, period and year

Rows: 777,550 · Primary key: ID, CD, YR, SCL · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| CD | varchar(1) |  |  |  |
| YR | varchar(9) |  |  |  |
| DE | varchar(20) |  |  |  |
| AL | smallint |  |  |  |
| P0 | smallint |  |  |  |
| P1 | smallint |  |  |  |
| P2 | smallint |  |  |  |
| P3 | smallint |  |  |  |
| P4 | smallint |  |  |  |
| P5 | smallint |  |  |  |
| P6 | smallint |  |  |  |
| P7 | smallint |  |  |  |
| P8 | smallint |  |  |  |
| P9 | smallint |  |  |  |
| SCL | smallint |  |  |  |
| STY | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: AHD.ID = IDN.ID
- inferred → **STU**: AHD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
