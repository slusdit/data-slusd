# RPP

Stores definitions of Reports to be printed in packets for various reasons

Rows: 59 · Primary key: SC, CD, PO · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| CD | varchar(3) |  |  | COD RPP.CD (3 codes) |
| PO | smallint |  |  |  |
| RN | varchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: RPP.SC = LOC.CD (school code)
