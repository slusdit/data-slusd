# GBB

Stores information about the Gradebook backups that are done

Rows: 25,260 · Primary key: BID · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| BID | int |  |  |  |
| SC | smallint |  |  | → TCH, LOC |
| YR | smallint |  |  |  |
| GN | int |  |  |  |
| TN | smallint |  |  | → TCH |
| NM | nvarchar(50) |  |  |  |
| TM | nvarchar(20) |  |  |  |
| PD | varchar(6) |  |  |  |
| FP | nvarchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| XB | nvarchar(max) |  |  |  |
| CO | nvarchar(255) |  |  |  |
| SID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **TCH**: GBB.SC = TCH.SC AND GBB.TN = TCH.TN (teacher number)
- inferred → **LOC**: GBB.SC = LOC.CD (school code)
