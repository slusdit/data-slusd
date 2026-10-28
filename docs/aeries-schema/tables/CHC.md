# CHC

Allows removal/addition Course Characteristics to a specific transcript record.

Rows: 0 · Primary key: PID, HSQ, CD · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → HIS.PID |
| HSQ | smallint |  |  | FK → HIS.SQ |
| TG | nvarchar(1) |  |  |  |
| CD | nvarchar(6) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **HIS**: CHC.PID = HIS.PID AND CHC.HSQ = HIS.SQ
