# DAM

Content of Alert Sent and User initiating the Request

Rows: 0 · Primary key: NID, CL · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| NID | int |  |  | FK → DAA.NID |
| CL | nvarchar(2) |  |  |  |
| CCO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DAA**: DAM.NID = DAA.NID
