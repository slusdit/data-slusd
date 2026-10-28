# MHS

History of Major Medical concerns

Rows: 27,249 · Primary key: PID, SQ · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| CD | varchar(3) |  |  | COD MHS.CD (43 codes) |
| DT | datetime | yes |  |  |
| GR | smallint |  |  |  |
| AG | smallint |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| TG | varchar(1) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| PC | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: MHS.PID = IDN.ID
