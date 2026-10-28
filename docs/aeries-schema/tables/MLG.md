# MLG

Logs the dates and times medications are administered to a student

Rows: 1 · Primary key: PID, CD, SQ, SQ1 · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → MLM.PID |
| CD | varchar(3) |  |  | FK → MLM.CD |
| SQ | smallint |  |  | FK → MLM.SQ |
| SQ1 | smallint |  |  |  |
| DA | money |  |  |  |
| DQ | money |  |  |  |
| DM | varchar(3) |  |  |  |
| DD | varchar(3) |  |  |  |
| DN | smallint |  |  |  |
| TA | smallint |  |  |  |
| DT | datetime | yes |  |  |
| TM | datetime | yes |  |  |
| IN | varchar(6) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **MLM**: MLG.PID = MLM.PID AND MLG.CD = MLM.CD AND MLG.SQ = MLM.SQ
