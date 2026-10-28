# LTA

Stores Attendance data from CAT table for use with Flex Scheduling. Similar to LEA.

Rows: 0 · Primary key: PID, ID, PT, LD, DY, SE · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → LTL.PID |
| ID | varchar(255) |  |  | FK → LTL.ID |
| PT | int |  |  | FK → LTL.PT |
| LD | datetime |  |  | FK → LTL.DT |
| DY | smallint |  |  |  |
| SE | smallint |  |  |  |
| AC | varchar(1) |  |  |  |
| DT | datetime | yes |  |  |
| SCL | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **LTL**: LTA.PID = LTL.PID AND LTA.ID = LTL.ID AND LTA.PT = LTL.PT AND LTA.LD = LTL.DT
- inferred → **STU**: LTA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
