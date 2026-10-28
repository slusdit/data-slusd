# TPO

Stores Third Party Options for use with Aeries APIs

Rows: 3 · Primary key: PID, NM · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → TPN.PID |
| NM | varchar(255) |  |  |  |
| OV | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **TPN**: TPO.PID = TPN.PID
