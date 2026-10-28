# VER

Contains the sheet numbers of absence verification sheets printed

Rows: 0 · Primary key: SC, SH, LI · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → STU, LOC |
| SH | smallint |  |  |  |
| LI | smallint |  |  |  |
| SN | int |  |  | → STU |
| DY | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: VER.SC = STU.SC AND VER.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: VER.SC = LOC.CD (school code)
