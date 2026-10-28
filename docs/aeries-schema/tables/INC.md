# INC

Contains detailed information on the progress the student is making towards the established goals

Rows: 54 · Primary key: PID, SQ, SQ1 · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → INV.PID |
| SQ | smallint |  |  | FK → INV.SQ |
| SQ1 | smallint |  |  |  |
| DT | datetime | yes |  |  |
| CD | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| NM | varchar(255) |  |  |  |
| GSQ | smallint |  |  |  |
| OPS | smallint |  |  |  |
| NPS | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **INV**: INC.PID = INV.PID AND INC.SQ = INV.SQ
