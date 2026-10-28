# MLM

Contains history of details of Medications

Rows: 1 · Primary key: PID, CD, SQ · Columns: 28

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| CD | varchar(3) |  |  | COD MLM.CD (130 codes) |
| SQ | smallint |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| EX | datetime | yes |  |  |
| DA | money |  |  |  |
| DQ | money |  |  |  |
| DM | varchar(3) |  |  | COD MLM.DM (7 codes) |
| DD | varchar(3) |  |  | COD MLM.DD (16 codes) |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| D3 | datetime | yes |  |  |
| D4 | datetime | yes |  |  |
| D5 | datetime | yes |  |  |
| D6 | datetime | yes |  |  |
| D7 | datetime | yes |  |  |
| D8 | datetime | yes |  |  |
| D9 | datetime | yes |  |  |
| MG | varchar(3) |  |  | COD MLM.MG (9 codes) |
| IN | varchar(6) |  |  |  |
| MO | varchar(3) |  |  | COD MLM.MO (3 codes) |
| CO | nvarchar(max) |  |  |  |
| PR | varchar(6) |  |  | COD MLM.PR (3 codes) |
| RX | varchar(12) |  |  |  |
| HM | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: MLM.PID = IDN.ID

## Referenced by (declared FKs)

- **MLG**: MLG.PID = MLM.PID AND MLG.CD = MLM.CD AND MLG.SQ = MLM.SQ
