# DVR

Data Validation Results

Rows: 114,357 · Primary key: SQ · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SQ | int |  |  |  |
| VID | int |  |  | FK → DVD.VID |
| SCL | smallint |  |  |  |
| KY1 | varchar(255) |  |  |  |
| KY2 | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| AG | smallint |  |  |  |
| DR | datetime | yes |  |  |
| DE | nvarchar(255) |  |  |  |
| QS | nvarchar(255) |  |  |  |
| SID | int |  |  |  |
| TID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DVD**: DVR.VID = DVD.VID
