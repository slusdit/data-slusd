# INA

Stores Actions for each Intervention Goal

Rows: 1 · Primary key: PID, SQ, SQ1 · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → ING.PID |
| SQ | smallint |  |  | FK → ING.SQ |
| SQ1 | smallint |  |  |  |
| GSQ | smallint |  |  | FK → ING.SQ1 |
| SSQ | smallint |  |  |  |
| CD | varchar(3) |  |  |  |
| DE | varchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| CS | nvarchar(max) |  |  |  |
| TD | datetime | yes |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ING**: INA.PID = ING.PID AND INA.SQ = ING.SQ AND INA.GSQ = ING.SQ1
