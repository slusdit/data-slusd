# RET

Record of Retention actions, whether retention occurred or was set aside and for what reason

Rows: 91 · Primary key: PID, SQ · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| DT | datetime | yes |  |  |
| CD | varchar(2) |  |  | COD RET.CD (9 codes) |
| CO | nvarchar(max) |  |  |  |
| TG | varchar(1) |  |  |  |
| GR | smallint |  |  |  |
| SQ | smallint |  |  |  |
| AY | nvarchar(9) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: RET.PID = IDN.ID
