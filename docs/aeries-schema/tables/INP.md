# INP

Contains instructional practices or strategies defined for the student and intervention

Rows: 13 · Primary key: PID, SQ, SQ1 · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → INV.PID |
| SQ | smallint |  |  | FK → INV.SQ |
| SQ1 | smallint |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| CD | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| NM | varchar(255) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **INV**: INP.PID = INV.PID AND INP.SQ = INV.SQ
