# ACT

Recording Activities in which student participates, and Awards received by student

Rows: 2,467 · Primary key: PID, SQ · Columns: 31

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| TY | varchar(1) |  |  |  |
| CD | varchar(4) |  |  | COD ACT.CD (126 codes) |
| NM | varchar(40) |  |  |  |
| DT | datetime | yes |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| HA | money |  |  |  |
| HR | money |  |  |  |
| SQ | smallint |  |  |  |
| RS | varchar(6) |  |  | COD ACT.RS (3 codes) |
| SE | varchar(3) |  |  |  |
| ST | varchar(1) |  |  |  |
| TD | datetime | yes |  |  |
| TS | varchar(1) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| PW | nvarchar(3) |  |  |  |
| IBF | money |  |  |  |
| IBV | nvarchar(6) |  |  |  |
| IBS | nvarchar(1) |  |  |  |
| PCR | varchar(2) |  |  |  |
| HDR | varchar(2) |  |  |  |
| RWL | varchar(1) |  |  |  |
| IBB | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ACT.PID = IDN.ID
