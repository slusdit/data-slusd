# SDT

Seating Chart Details

Rows: 19,696 · Primary key: SC, SE, ID, SQ · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | int |  |  | → MST, LOC |
| SE | int |  |  | → MST |
| ID | int |  |  | → STU |
| SQ | int |  |  | FK → SCH.SQ |
| RW | smallint |  |  |  |
| CL | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SCH**: SDT.SQ = SCH.SQ
- inferred → **STU**: SDT.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **MST**: SDT.SC = MST.SC AND SDT.SE = MST.SE (section number)
- inferred → **LOC**: SDT.SC = LOC.CD (school code)
