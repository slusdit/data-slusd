# TPP

Stores Third Party Permissions.

Rows: 632 · Primary key: PID, TC · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → TPN.PID |
| TC | varchar(255) |  |  |  |
| RD | smallint |  |  |  |
| UP | smallint |  |  |  |
| INS | smallint |  |  |  |
| DL | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **TPN**: TPP.PID = TPN.PID
