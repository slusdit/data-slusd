# INS

Stores Stakeholders for each Intervention.

Rows: 18 · Primary key: PID, SQ, SQ1 · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → INV.PID |
| SQ | smallint |  |  | FK → INV.SQ |
| SQ1 | smallint |  |  |  |
| NM | varchar(255) |  |  |  |
| RL | varchar(255) |  |  |  |
| AT | varchar(15) |  |  |  |
| AID | int |  |  |  |
| EM | nvarchar(255) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **INV**: INS.PID = INV.PID AND INS.SQ = INV.SQ
