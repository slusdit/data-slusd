# INR

Stores Resources for each Intervention.

Rows: 31 · Primary key: PID, SQ, SQ1 · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → INV.PID |
| SQ | smallint |  |  | FK → INV.SQ |
| SQ1 | smallint |  |  |  |
| CD | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **INV**: INR.PID = INV.PID AND INR.SQ = INV.SQ
