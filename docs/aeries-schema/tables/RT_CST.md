# RT_CST

Records transfer holding table. Stores a copy of incoming CST data before it's imported.

Rows: 0 · Primary key: RequestID, PID, ID, PT, TA, RT, RP · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RequestID | varchar(255) |  |  |  |
| Imported | bit |  |  |  |
| Duplicate | bit |  |  |  |
| PID | int |  |  |  |
| ID | varchar(8) |  |  | → STU |
| PT | smallint |  |  |  |
| TA | varchar(6) |  |  |  |
| GR | smallint |  |  |  |
| TD | datetime | yes |  |  |
| RS | smallint |  |  |  |
| RT | varchar(8) |  |  |  |
| RP | smallint |  |  |  |
| SCL | smallint |  |  |  |
| SS | smallint |  |  |  |
| OT | nvarchar(20) |  |  |  |
| PL | nvarchar(255) |  |  |  |
| RPL | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: RT_CST.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
