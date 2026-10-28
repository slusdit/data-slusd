# RJN

Logs parent's protest to data retained in any student record in accordance with California Ed. Code 49070(d) and 49072.

Rows: 4 · Primary key: PID, SQ · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| RJ | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| SQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: RJN.PID = IDN.ID
