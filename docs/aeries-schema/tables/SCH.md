# SCH

Seating Chart Table

Rows: 737 · Primary key: SQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SQ | int |  |  |  |
| SC | int |  |  | → MST, LOC |
| SE | int |  |  | → MST |
| SID | int |  |  | FK → STF.ID |
| TY | bit |  |  |  |
| NM | nvarchar(255) |  |  |  |
| RW | smallint |  |  |  |
| CL | smallint |  |  |  |
| ATT | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STF**: SCH.SID = STF.ID
- inferred → **MST**: SCH.SC = MST.SC AND SCH.SE = MST.SE (section number)
- inferred → **LOC**: SCH.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **SDT**: SDT.SQ = SCH.SQ
