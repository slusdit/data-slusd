# DRI

Aeries Web Only. Contains all of the individual district resource copies

Rows: 66 · Primary key: RID, RIN · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | int |  |  | FK → DRT.RID |
| RIN | int |  |  |  |
| BC | varchar(50) |  |  |  |
| RM | varchar(6) |  |  |  |
| CC | varchar(1) |  |  | COD DRI.CC (4 codes) |
| ST | varchar(1) |  |  |  |
| CD | varchar(1) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| SCL | smallint |  |  |  |
| PR | money |  |  |  |
| WH | varchar(3) |  |  |  |
| SR | varchar(255) |  |  |  |
| MAC | varchar(12) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DRT**: DRI.RID = DRT.RID

## Referenced by (declared FKs)

- **DRA**: DRA.RID = DRI.RID AND DRA.RIN = DRI.RIN
