# IMC

Used for weekly Teacher certification of instructional minutes

Rows: 0 · Primary key: SC, SE, TN, DT · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → MST, TCH, LOC |
| SE | smallint |  |  | → MST |
| TN | smallint |  |  | → TCH |
| DT | datetime |  |  |  |
| MC | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **MST**: IMC.SC = MST.SC AND IMC.SE = MST.SE (section number)
- inferred → **TCH**: IMC.SC = TCH.SC AND IMC.TN = TCH.TN (teacher number)
- inferred → **LOC**: IMC.SC = LOC.CD (school code)

## Used in views

`SLUSD_Instructional_Minutes`
