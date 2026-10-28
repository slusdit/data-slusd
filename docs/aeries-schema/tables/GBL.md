# GBL

Log used to track parents and/or students who view a teacher's gradebook via Parent Portal

Rows: 0 · Primary key: SQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| SQ | int |  |  |  |
| NM | nvarchar(255) |  |  |  |
| PG | nvarchar(255) |  |  |  |
| GN | int |  |  |  |
| DT | datetime |  |  |  |
| UT | nvarchar(10) |  |  |  |
| IP | nvarchar(50) |  |  |  |
| CO | nvarchar(255) |  |  |  |
| NUM | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: GBL.SC = LOC.CD (school code)
