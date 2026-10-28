# CRT

Stores transcript requests from Colleges

Rows: 2 · Primary key: PID, CN · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| CN | smallint |  |  | FK → COL.ID |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| D3 | datetime | yes |  |  |
| TG | varchar(1) |  |  |  |
| S1 | varchar(2) |  |  |  |
| S2 | varchar(2) |  |  |  |
| S3 | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **COL**: CRT.CN = COL.ID
- declared FK → **IDN**: CRT.PID = IDN.ID
- inferred → **CRS**: CRT.CN = CRS.CN (course number)
