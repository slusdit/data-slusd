# SCS


Rows: 42,164 · Primary key: PID, SQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| DT | varchar(4) |  |  |  |
| ST | smallint |  |  |  |
| CL | smallint |  |  |  |
| RS | smallint |  |  |  |
| PC | smallint |  |  |  |
| SQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SCS.PID = IDN.ID
