# IPI

Stores Prior Interventions for each Intervention.

Rows: 100 · Primary key: PID, SQ, SQ1 · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → INV.PID |
| SQ | smallint |  |  | FK → INV.SQ |
| SQ1 | smallint |  |  |  |
| CD | varchar(3) |  |  | COD IPI.CD (3 codes) |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **INV**: IPI.PID = INV.PID AND IPI.SQ = INV.SQ
