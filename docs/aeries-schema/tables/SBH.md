# SBH

History of Grades given to Elementary Students

Rows: 1,216,671 · Primary key: PID, SD, YR, MT, GR · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| SD | varchar(20) |  |  | FK → STN.SD |
| YR | varchar(50) |  |  |  |
| MT | varchar(2) |  |  |  |
| SQ | smallint |  |  |  |
| GR | smallint |  |  |  |
| TE1 | varchar(255) |  |  |  |
| ID1 | int |  |  |  |
| TE2 | varchar(255) |  |  |  |
| ID2 | int |  |  |  |
| TE3 | varchar(255) |  |  |  |
| ID3 | int |  |  |  |
| TE4 | varchar(255) |  |  |  |
| ID4 | int |  |  |  |
| M1 | varchar(5) |  |  |  |
| M2 | varchar(5) |  |  |  |
| M3 | varchar(5) |  |  |  |
| M4 | varchar(5) |  |  |  |
| PL | int |  |  |  |
| SCL | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SBH.PID = IDN.ID
- declared FK → **STN**: SBH.SD = STN.SD
