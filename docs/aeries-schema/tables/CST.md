# CST

Stores the Content Standard Scores that are loaded from STAR

Rows: 466,328 · Primary key: PID, ID, PT, TA, RT, RP · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| ID | varchar(8) |  |  | → STU |
| PT | smallint |  |  |  |
| TA | varchar(6) |  |  |  |
| GR | smallint |  |  |  |
| TD | datetime | yes |  |  |
| RS | smallint |  |  |  |
| RT | varchar(8) |  |  |  |
| RP | smallint |  |  |  |
| SCL | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| SS | smallint |  |  |  |
| OT | nvarchar(20) |  |  |  |
| PL | nvarchar(255) |  |  |  |
| RPL | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: CST.PID = IDN.ID
- inferred → **STU**: CST.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Used in views

`SLUSD_CSSB_ELA_WL_PROFICIENCY`
