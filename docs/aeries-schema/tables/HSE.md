# HSE

Contains records of Healthy Start Program Services Rendered

Rows: 0 · Primary key: PID, SQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| DT | datetime |  |  |  |
| CD | varchar(6) |  |  |  |
| UN | smallint |  |  |  |
| PA | varchar(1) |  |  |  |
| DE | nvarchar(max) |  |  |  |
| SQ | smallint |  |  |  |
| RF | varchar(50) |  |  |  |
| SCL | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: HSE.PID = IDN.ID
