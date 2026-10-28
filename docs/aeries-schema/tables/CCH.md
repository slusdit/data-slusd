# CCH

Allows districts to define a course in more granular detail.

Rows: 0 · Primary key: CN, CD · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CN | varchar(6) |  |  | FK → CRS.CN |
| CD | nvarchar(6) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: CCH.CN = CRS.CN
- inferred → **CRS**: CCH.CN = CRS.CN (course number)
