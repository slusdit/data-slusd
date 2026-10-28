# ING

Contains details regarding the intervention goals set for a student

Rows: 43 · Primary key: PID, SQ, SQ1 · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → INV.PID |
| SQ | smallint |  |  | FK → INV.SQ |
| SQ1 | smallint |  |  |  |
| DT | datetime | yes |  |  |
| GL | varchar(255) |  |  |  |
| TD | datetime | yes |  |  |
| TG | varchar(1) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| NM | varchar(255) |  |  |  |
| DE | varchar(255) |  |  |  |
| PS | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **INV**: ING.PID = INV.PID AND ING.SQ = INV.SQ

## Referenced by (declared FKs)

- **INA**: INA.PID = ING.PID AND INA.SQ = ING.SQ AND INA.GSQ = ING.SQ1
