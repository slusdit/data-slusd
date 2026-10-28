# SCO

Contains history of details of Scoliosis Tests

Rows: 1,313 · Primary key: PID, SQ · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| TD | datetime | yes |  |  |
| GR | smallint |  |  |  |
| AG | smallint |  |  |  |
| SCN | varchar(3) |  |  |  |
| DR | varchar(3) |  |  |  |
| DT | datetime | yes |  |  |
| PF | varchar(1) |  |  |  |
| IN | varchar(6) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| WV | varchar(2) |  |  |  |
| TP | nvarchar(3) |  |  |  |
| DG | nvarchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SCO.PID = IDN.ID
