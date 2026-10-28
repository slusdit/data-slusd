# LTL

Logs the Letter Type, Student, Date and User who created Letters.

Rows: 106,148 · Primary key: PID, ID, PT, DT · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| ID | varchar(255) |  |  | → STU |
| DT | datetime |  |  |  |
| AM | money |  |  |  |
| NM | varchar(255) |  |  |  |
| PD | varchar(10) |  |  |  |
| CIS | bit |  |  |  |
| SCL | smallint |  |  |  |
| TID | nvarchar(255) |  |  |  |
| PT | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: LTL.PID = IDN.ID
- inferred → **STU**: LTL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **LEA**: LEA.PID = LTL.PID AND LEA.ID = LTL.ID AND LEA.PT = LTL.PT AND LEA.LD = LTL.DT
- **LTA**: LTA.PID = LTL.PID AND LTA.ID = LTL.ID AND LTA.PT = LTL.PT AND LTA.LD = LTL.DT
