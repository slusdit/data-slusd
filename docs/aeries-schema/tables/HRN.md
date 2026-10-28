# HRN

Contains history of details of Hearing Tests

Rows: 40,689 · Primary key: PID, SQ · Columns: 36

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| TD | datetime | yes |  |  |
| GR | smallint |  |  |  |
| SR | varchar(5) |  |  | COD HRN.SR (1 codes) |
| SL | varchar(5) |  |  |  |
| PR | varchar(5) |  |  |  |
| PL | varchar(5) |  |  |  |
| DR | varchar(3) |  |  |  |
| DT | datetime | yes |  |  |
| IC | varchar(3) |  |  |  |
| ID | datetime | yes |  | → STU |
| SCN | varchar(3) |  |  |  |
| FO | varchar(6) |  |  |  |
| PF | varchar(1) |  |  |  |
| R1 | smallint |  |  |  |
| R2 | smallint |  |  |  |
| R3 | smallint |  |  |  |
| R4 | smallint |  |  |  |
| R5 | smallint |  |  |  |
| R6 | smallint |  |  |  |
| R7 | smallint |  |  |  |
| L1 | smallint |  |  |  |
| L2 | smallint |  |  |  |
| L3 | smallint |  |  |  |
| L4 | smallint |  |  |  |
| L5 | smallint |  |  |  |
| L6 | smallint |  |  |  |
| L7 | smallint |  |  |  |
| CT | varchar(6) |  |  |  |
| IN | varchar(6) |  |  | COD HRN.IN (2 codes) |
| CO | nvarchar(max) |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| WV | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: HRN.PID = IDN.ID
- inferred → **STU**: HRN.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
