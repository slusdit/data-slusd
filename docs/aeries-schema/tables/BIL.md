# BIL

For tuition billing of students – more detailed than the FEE table

Rows: 0 · Primary key: SC, TN · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → PST.SC, STU.SC |
| SN | int |  |  | FK → STU.SN |
| TN | int |  |  | → TCH |
| ID | varchar(5) |  |  |  |
| DT | datetime | yes |  |  |
| TA | money |  |  |  |
| NP | smallint |  |  |  |
| EP | money |  |  |  |
| TP | money |  |  |  |
| PR | smallint |  |  |  |
| BO | money |  |  |  |
| CO | nvarchar(max) |  |  |  |
| PST | varchar(3) |  |  | FK → PST.ID |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **PST**: BIL.SC = PST.SC AND BIL.PST = PST.ID
- declared FK → **STU**: BIL.SC = STU.SC AND BIL.SN = STU.SN
- inferred → **STU**: BIL.SC = STU.SC AND BIL.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **TCH**: BIL.SC = TCH.SC AND BIL.TN = TCH.TN (teacher number)
- inferred → **LOC**: BIL.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **PAY**: PAY.SC = BIL.SC AND PAY.TN = BIL.TN
