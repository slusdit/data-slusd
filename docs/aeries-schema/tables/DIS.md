# DIS

Contains data for one of the two Discipline Tables – Less detail than ADS (both can be used)

Rows: 4,122 · Primary key: PID, SQ · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| DT | datetime | yes |  |  |
| CD | varchar(2) |  |  | COD DIS.CD (53 codes) |
| CO | nvarchar(max) |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| SID | int |  |  |  |
| UN | nvarchar(255) |  |  |  |
| LUB | nvarchar(255) |  |  |  |
| LUD | datetime | yes |  |  |
| ST | varchar(3) |  |  |  |
| ET | datetime | yes |  |  |
| LCN | varchar(6) |  |  |  |
| PM | varchar(3) |  |  |  |
| CN | varchar(3) |  |  | → CRS |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: DIS.PID = IDN.ID
- inferred → **CRS**: DIS.CN = CRS.CN (course number)
