# WPV

Aeries Web Only. Contains information about visits to work places by CTE/ROP teachers when students are interning at places of employment.

Rows: 3 · Primary key: PID, SQ, SQ1 · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → WPT.PID |
| SQ | smallint |  |  | FK → WPT.SQ |
| SQ1 | smallint |  |  |  |
| CD | varchar(3) |  |  |  |
| DT | datetime | yes |  |  |
| TM | datetime | yes |  |  |
| SO | varchar(1) |  |  |  |
| SNM | varchar(50) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **WPT**: WPV.PID = WPT.PID AND WPV.SQ = WPT.SQ
