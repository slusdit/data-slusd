# SRR


Rows: 0 · Primary key: RID, SQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | varchar(255) |  |  |  |
| SQ | int |  |  |  |
| SC | smallint |  |  | → MST, LOC |
| SE | smallint |  |  | → MST |
| PD | smallint |  |  |  |
| TS | int |  |  |  |
| CR | int |  |  |  |
| RJ | int |  |  |  |
| MSG | nvarchar(255) |  |  |  |
| USR | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **MST**: SRR.SC = MST.SC AND SRR.SE = MST.SE (section number)
- inferred → **LOC**: SRR.SC = LOC.CD (school code)
