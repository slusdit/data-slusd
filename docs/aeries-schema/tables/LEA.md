# LEA

Stores Attendance data relating to a student's Letter

Rows: 953,753 · Primary key: PID, ID, PT, LD, DY · Columns: 29

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → LTL.PID |
| ID | varchar(255) |  |  | FK → LTL.ID |
| LD | datetime |  |  | FK → LTL.DT |
| DY | smallint |  |  |  |
| CD | varchar(1) |  |  |  |
| PR | varchar(1) |  |  |  |
| GR | smallint |  |  |  |
| TR | varchar(1) |  |  |  |
| TN | smallint |  |  |  |
| AL | varchar(1) |  |  |  |
| A0 | varchar(1) |  |  |  |
| A1 | varchar(1) |  |  |  |
| A2 | varchar(1) |  |  |  |
| A3 | varchar(1) |  |  |  |
| A4 | varchar(1) |  |  |  |
| A5 | varchar(1) |  |  |  |
| A6 | varchar(1) |  |  |  |
| A7 | varchar(1) |  |  |  |
| A8 | varchar(1) |  |  |  |
| A9 | varchar(1) |  |  |  |
| DT | datetime | yes |  |  |
| RS | varchar(3) |  |  |  |
| NS | int |  |  |  |
| AP1 | varchar(3) |  |  |  |
| AP2 | varchar(3) |  |  |  |
| SCL | smallint |  |  |  |
| PT | int |  |  | FK → LTL.PT |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **LTL**: LEA.PID = LTL.PID AND LEA.ID = LTL.ID AND LEA.PT = LTL.PT AND LEA.LD = LTL.DT
- inferred → **STU**: LEA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
