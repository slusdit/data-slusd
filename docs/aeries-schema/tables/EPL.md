# EPL

Aeries Web Only. Define performance levels for each exam section

Rows: 0 · Primary key: EID, SID, LVL · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → ESN.EID |
| SID | int |  |  | FK → ESN.SID |
| LVL | int |  |  |  |
| NM | varchar(255) |  |  |  |
| LO | money |  |  |  |
| HI | money |  |  |  |
| CL | varchar(6) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ESN**: EPL.EID = ESN.EID AND EPL.SID = ESN.SID
