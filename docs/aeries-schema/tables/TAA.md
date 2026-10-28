# TAA

Aeries Web Only. Used by the Teacher Portal to store the ways a teacher is associated with students. Populated every time a teacher logs in to Aeries Web.

Rows: 14,518 · Primary key: UN, SC, LT, KY · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| UN | varchar(255) |  |  |  |
| SC | smallint |  |  | → LOC |
| LT | varchar(50) |  |  |  |
| KY | varchar(255) |  |  |  |
| DE | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: TAA.SC = LOC.CD (school code)
