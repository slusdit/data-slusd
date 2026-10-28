# CVT

Civil Rights Data Totals

Rows: 0 · Primary key: TN, TX, RN, RS · Columns: 20

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TN | varchar(25) |  |  | → TCH |
| TX | smallint |  |  |  |
| RN | smallint |  |  |  |
| SC | smallint |  |  | → TCH, LOC |
| SQ | int |  |  |  |
| NM | varchar(100) |  |  |  |
| T1 | int |  |  |  |
| T2 | int |  |  |  |
| T3 | int |  |  |  |
| T4 | int |  |  |  |
| T5 | int |  |  |  |
| T6 | int |  |  |  |
| T7 | int |  |  |  |
| T8 | int |  |  |  |
| T9 | int |  |  |  |
| T10 | int |  |  |  |
| T11 | int |  |  |  |
| RS | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **TCH**: CVT.SC = TCH.SC AND CVT.TN = TCH.TN (teacher number)
- inferred → **LOC**: CVT.SC = LOC.CD (school code)
