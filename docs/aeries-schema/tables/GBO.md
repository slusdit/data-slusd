# GBO

Sets options for Teacher Grades

Rows: 50,176 · Primary key: SC, ID, OPN · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| ID | nvarchar(255) |  |  | → STU |
| OPN | varchar(255) |  |  |  |
| OV | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: GBO.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: GBO.SC = LOC.CD (school code)
