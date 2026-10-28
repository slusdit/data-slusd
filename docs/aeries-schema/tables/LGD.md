# LGD

Logs student detail changes specifically for CALPADS reporting.

Rows: 23,118 · Primary key: ID, TC, FC, DTM · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| TC | varchar(4) |  |  |  |
| FC | varchar(4) |  |  |  |
| DTM | datetime |  |  |  |
| OD | varchar(255) |  |  |  |
| ND | varchar(255) |  |  |  |
| SC | smallint |  |  | → STU, LOC |
| SN | int |  |  | → STU |
| TID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: LGD.ID = IDN.ID
- inferred → **STU**: LGD.SC = STU.SC AND LGD.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: LGD.SC = LOC.CD (school code)
