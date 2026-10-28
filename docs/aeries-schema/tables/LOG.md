# LOG

Records critical changes made to specific data by the users

Rows: 9,192,428 · Primary key: TID · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TID | int |  |  |  |
| CD | varchar(50) |  |  |  |
| OB | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| USR | varchar(255) |  |  |  |
| SC | smallint |  |  | → STU, LOC |
| SN | int |  |  | → STU |
| ID | int |  |  |  |
| RCD | nvarchar(max) |  |  |  |
| CO | varchar(max) |  |  |  |
| OD | nvarchar(max) |  |  |  |
| ND | nvarchar(max) |  |  |  |
| IP | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: LOG.SC = STU.SC AND LOG.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: LOG.SC = LOC.CD (school code)
