# tst_backup_gate2025


Rows: 743,753 · Primary key: (none declared) · Columns: 36

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  |  |
| ID | varchar(8) |  |  | → STU |
| PT | smallint |  |  |  |
| GR | smallint |  |  |  |
| DT | varchar(4) |  |  |  |
| CL | smallint |  |  |  |
| RS | smallint |  |  |  |
| SS | smallint |  |  |  |
| GE | smallint |  |  |  |
| PC | smallint |  |  |  |
| OT | smallint |  |  |  |
| ST | smallint |  |  |  |
| CE | smallint |  |  |  |
| TD | datetime | yes |  |  |
| PR | money |  |  |  |
| PL | money |  |  |  |
| RU | smallint |  |  |  |
| TA | varchar(6) |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| SRC | varchar(3) |  |  |  |
| TY | varchar(3) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| LX | int |  |  |  |
| QT | int |  |  |  |
| PI | money |  |  |  |
| PA1 | int |  |  |  |
| PA2 | int |  |  |  |
| PA3 | int |  |  |  |
| ELP | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: tst_backup_gate2025.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
