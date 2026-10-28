# MSTM


Rows: 52 · Primary key: SC, SN, SQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| SQ | smallint |  |  |  |
| YR | varchar(4) | yes |  |  |
| TN | smallint |  |  | → TCH |
| TNM | nvarchar(100) |  |  |  |
| ED | datetime | yes |  |  |
| LD | datetime | yes |  |  |
| NOTE | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: MSTM.SC = STU.SC AND MSTM.SN = STU.SN
- inferred → **STU**: MSTM.SC = STU.SC AND MSTM.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **TCH**: MSTM.SC = TCH.SC AND MSTM.TN = TCH.TN (teacher number)
- inferred → **LOC**: MSTM.SC = LOC.CD (school code)
