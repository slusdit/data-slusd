# GBC

Types of Grading Scales used by each teacher, associated with individual Gradebook Assignments so letter or character grades can be given instead of numeric values

Rows: 33 · Primary key: CID · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CID | int |  |  |  |
| NM | nvarchar(20) |  |  |  |
| DE | nvarchar(255) |  |  |  |
| TN | smallint |  |  | → TCH |
| SC | smallint |  |  | → TCH, LOC |
| SID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **TCH**: GBC.SC = TCH.SC AND GBC.TN = TCH.TN (teacher number)
- inferred → **LOC**: GBC.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **GBM**: GBM.CID = GBC.CID
