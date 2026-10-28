# RT_TST

Records transfer holding table. Stores a copy of incoming TST data before it's imported.

Rows: 0 · Primary key: RequestID, PID, SQ · Columns: 33

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RequestID | varchar(255) |  |  |  |
| Imported | bit |  |  |  |
| Duplicate | bit |  |  |  |
| PID | int |  |  |  |
| ID | varchar(8) |  |  | → STU |
| PT | smallint |  |  |  |
| SQ | int |  |  |  |
| GR | smallint |  |  |  |
| DT | varchar(4) |  |  |  |
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
| SCL | smallint |  |  |  |
| SRC | varchar(3) |  |  |  |
| TY | varchar(3) |  |  |  |
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

- inferred → **STU**: RT_TST.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
