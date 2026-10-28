# PFT

Contains results of Physical Performance Testing

Rows: 23,990 · Primary key: PID, TA · Columns: 44

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| NT | smallint |  |  |  |
| SP | smallint |  |  |  |
| MI | smallint |  |  |  |
| PA | smallint |  |  |  |
| CU | smallint |  |  |  |
| TL | smallint |  |  |  |
| PU | smallint |  |  |  |
| MP | smallint |  |  |  |
| PL | smallint |  |  |  |
| AH | smallint |  |  |  |
| RL | smallint |  |  |  |
| RR | smallint |  |  |  |
| SL | varchar(1) |  |  |  |
| SR | varchar(1) |  |  |  |
| HT | smallint |  |  |  |
| WT | smallint |  |  |  |
| ST | smallint |  |  |  |
| SK | smallint |  |  |  |
| WA | smallint |  |  |  |
| HR | smallint |  |  |  |
| BI | money |  |  |  |
| TA | varchar(6) |  |  |  |
| DT | datetime | yes |  |  |
| SCL | smallint |  |  |  |
| GR | smallint |  |  |  |
| AC | smallint |  |  |  |
| BC | smallint |  |  |  |
| AS | smallint |  |  |  |
| TS | smallint |  |  |  |
| UB | smallint |  |  |  |
| FL | smallint |  |  |  |
| PF | varchar(1) |  |  |  |
| PC | nvarchar(max) |  |  |  |
| VO | money |  |  |  |
| BM | money |  |  |  |
| PF1 | varchar(1) |  |  |  |
| PF2 | varchar(1) |  |  |  |
| PF3 | varchar(1) |  |  |  |
| PF4 | varchar(1) |  |  |  |
| PF5 | varchar(1) |  |  |  |
| PF6 | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: PFT.PID = IDN.ID
