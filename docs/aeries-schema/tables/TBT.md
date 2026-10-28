# TBT

Contains information about textbook titles including total copies and replacement costs

Rows: 0 · Primary key: SC, TN · Columns: 29

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → TCH, LOC |
| TN | smallint |  |  | → TCH |
| TI | varchar(60) |  |  |  |
| AU | varchar(50) |  |  |  |
| ED | varchar(4) |  |  |  |
| CP | smallint |  |  |  |
| AV | smallint |  |  |  |
| FC | smallint |  |  |  |
| LC | smallint |  |  |  |
| PR | money |  |  |  |
| DP | varchar(2) |  |  |  |
| PB | varchar(50) |  |  |  |
| CR | varchar(4) |  |  |  |
| AD | datetime | yes |  |  |
| VN | int |  |  |  |
| CT | varchar(10) |  |  |  |
| RC | money |  |  |  |
| LB | varchar(16) |  |  |  |
| IS | varchar(13) |  |  |  |
| D1 | money |  |  |  |
| D2 | money |  |  |  |
| D3 | money |  |  |  |
| D4 | money |  |  |  |
| C1 | varchar(2) |  |  |  |
| C2 | varchar(1) |  |  |  |
| C3 | varchar(1) |  |  |  |
| CC | varchar(60) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **TCH**: TBT.SC = TCH.SC AND TBT.TN = TCH.TN (teacher number)
- inferred → **LOC**: TBT.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **TBC**: TBC.SC = TBT.SC AND TBC.TN = TBT.TN
