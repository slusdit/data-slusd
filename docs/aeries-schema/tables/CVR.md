# CVR

Civil Rights Data

Rows: 0 · Primary key: ID, PT, TN, TX, RN, RS · Columns: 31

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| PT | smallint |  |  |  |
| TN | varchar(25) |  |  | → TCH |
| TX | smallint |  |  |  |
| RN | smallint |  |  |  |
| SQ | int |  |  |  |
| SC | smallint |  |  | → MST, TCH, LOC |
| HS | smallint |  |  |  |
| LN | nvarchar(255) |  |  |  |
| FN | nvarchar(255) |  |  |  |
| GN | varchar(1) |  |  |  |
| GR | int |  |  |  |
| HI | int |  |  |  |
| AI | int |  |  |  |
| AZ | int |  |  |  |
| HW | int |  |  |  |
| BK | int |  |  |  |
| WH | int |  |  |  |
| MR | int |  |  |  |
| SE | int |  |  | → MST |
| D4 | int |  |  |  |
| EL | int |  |  |  |
| GT | int |  |  |  |
| TK | int |  |  |  |
| C1 | int |  |  |  |
| C2 | int |  |  |  |
| C3 | int |  |  |  |
| C4 | int |  |  |  |
| RS | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: CVR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **MST**: CVR.SC = MST.SC AND CVR.SE = MST.SE (section number)
- inferred → **TCH**: CVR.SC = TCH.SC AND CVR.TN = TCH.TN (teacher number)
- inferred → **LOC**: CVR.SC = LOC.CD (school code)
