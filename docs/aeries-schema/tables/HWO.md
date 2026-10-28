# HWO

Contains history of details of Height and Weight of Student

Rows: 1,180 · Primary key: PID, SQ · Columns: 25

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| TD | datetime | yes |  |  |
| GR | smallint |  |  |  |
| HE | varchar(6) |  |  |  |
| WE | varchar(6) |  |  |  |
| BP | varchar(7) |  |  |  |
| SD | datetime | yes |  |  |
| SR | varchar(3) |  |  |  |
| CD | datetime | yes |  |  |
| CR | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| HP | varchar(3) |  |  |  |
| WP | varchar(3) |  |  |  |
| BM | smallint |  |  |  |
| IN | varchar(6) |  |  |  |
| AG | smallint |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| GL | smallint |  |  |  |
| CH | smallint |  |  |  |
| TR | smallint |  |  |  |
| AC | varchar(1) |  |  |  |
| WV | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: HWO.PID = IDN.ID
