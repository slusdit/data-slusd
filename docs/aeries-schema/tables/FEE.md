# FEE

Contains records of Fees charged to and collected from Students

Rows: 584 · Primary key: PID, SQ · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| CD | varchar(6) |  |  | COD FEE.CD (163 codes) |
| AM | money |  |  |  |
| DT | datetime | yes |  |  |
| PD | money |  |  |  |
| DP | datetime | yes |  |  |
| LT | smallint |  |  |  |
| CO | nvarchar(max) |  |  |  |
| TN | smallint |  |  |  |
| CY | smallint |  |  |  |
| RN | varchar(15) |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| RID | int |  |  |  |
| RIN | int |  |  |  |
| FT | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FEE.PID = IDN.ID
