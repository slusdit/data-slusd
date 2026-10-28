# OBJ

Test objectives for "Teacher Made Test" – Can be DISTRICT MANAGED.

Rows: 15 · Primary key: SC, TN, OB · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → TCH, LOC |
| TN | smallint |  |  | COD OBJ.TN (5 codes); → TCH |
| OB | smallint |  |  |  |
| TI | varchar(30) |  |  |  |
| TQ | smallint |  |  |  |
| PS | smallint |  |  |  |
| TG | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **TCH**: OBJ.SC = TCH.SC AND OBJ.TN = TCH.TN (teacher number)
- inferred → **LOC**: OBJ.SC = LOC.CD (school code)
