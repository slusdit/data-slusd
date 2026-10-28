# APC

Stores a student's current academic plan

Rows: 18 · Primary key: PID, SQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → APL.PID |
| SQ | smallint |  |  | FK → APL.SQ |
| GR | smallint |  |  |  |
| TM | varchar(1) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| LC | varchar(6) |  |  |  |
| TRN | varchar(3) |  |  |  |
| TRS | varchar(3) |  |  |  |
| LK | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **APL**: APC.PID = APL.PID AND APC.SQ = APL.SQ
- inferred → **CRS**: APC.CN = CRS.CN (course number)
