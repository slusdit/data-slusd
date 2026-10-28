# BSD

Provides for a variety of Bell Schedules which can be assigned to the Calendar

Rows: 19 · Primary key: SC, KY · Columns: 27

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| KY | smallint |  |  |  |
| TY | varchar(1) |  |  | COD BSD.TY (21 codes) |
| TI | varchar(50) |  |  |  |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| SP | smallint |  |  |  |
| TP | smallint |  |  |  |
| DP | smallint |  |  |  |
| D1 | varchar(50) |  |  |  |
| B1 | smallint |  |  |  |
| P1 | smallint |  |  |  |
| A1 | smallint |  |  |  |
| D2 | varchar(50) |  |  |  |
| B2 | smallint |  |  |  |
| P2 | smallint |  |  |  |
| A2 | smallint |  |  |  |
| D3 | varchar(50) |  |  |  |
| B3 | smallint |  |  |  |
| P3 | smallint |  |  |  |
| A3 | smallint |  |  |  |
| D4 | varchar(50) |  |  |  |
| B4 | smallint |  |  |  |
| P4 | smallint |  |  |  |
| A4 | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: BSD.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **BST**: BST.SC = BSD.SC AND BST.KY = BSD.KY
