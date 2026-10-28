# GBE

Stores the Section or Teacher Numbers associated with an individual gradebook

Rows: 1,529 · Primary key: SC, GN, SE · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → MST, LOC |
| GN | int |  |  | FK → GBK.GN |
| SE | smallint |  |  | → MST |
| PR | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBK**: GBE.GN = GBK.GN
- inferred → **MST**: GBE.SC = MST.SC AND GBE.SE = MST.SE (section number)
- inferred → **LOC**: GBE.SC = LOC.CD (school code)
