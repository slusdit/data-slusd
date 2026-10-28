# PGS

Program Services

Rows: 28 · Primary key: PID, SQ, SQ1 · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → PGM.PID |
| SQ | smallint |  |  | FK → PGM.SQ |
| SQ1 | smallint |  |  |  |
| SR | varchar(8) |  |  | COD PGS.SR (181 codes) |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **PGM**: PGS.PID = PGM.PID AND PGS.SQ = PGM.SQ
