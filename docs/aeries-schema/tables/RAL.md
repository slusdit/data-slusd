# RAL

Record of those who have accessed the student data, cumulative record or test scores

Rows: 7 · Primary key: PID, SQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| NM | varchar(60) |  |  |  |
| RS | varchar(80) |  |  |  |
| CRC | varchar(255) |  |  |  |
| RA | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| SQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: RAL.PID = IDN.ID
