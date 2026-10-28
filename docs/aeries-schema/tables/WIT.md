# WIT

Store information for Witnesses of harassment or any other offenses

Rows: 2 · Primary key: PID, SQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| IID | int |  |  |  |
| CO | nvarchar(max) |  |  |  |
| TS | nvarchar(max) |  |  |  |
| TY | varchar(3) |  |  |  |
| ST | varchar(3) |  |  | COD WIT.ST (2 codes) |
| SCL | smallint |  |  |  |
| LCN | varchar(6) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: WIT.PID = IDN.ID
