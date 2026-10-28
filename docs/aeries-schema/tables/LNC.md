# LNC

Utilized through Teacher Portal to report the daily lunch count to the office

Rows: 10,264 · Primary key: SC, DT, TN, TY, SE · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → MST.SC, TCH.SC |
| DT | datetime |  |  |  |
| TN | smallint |  |  | FK → TCH.TN |
| TY | varchar(2) |  |  | COD LNC.TY (1 codes) |
| NM | money |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DS | datetime |  |  |  |
| SE | smallint |  |  | FK → MST.SE |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **MST**: LNC.SC = MST.SC AND LNC.SE = MST.SE
- declared FK → **TCH**: LNC.SC = TCH.SC AND LNC.TN = TCH.TN
- inferred → **MST**: LNC.SC = MST.SC AND LNC.SE = MST.SE (section number)
- inferred → **TCH**: LNC.SC = TCH.SC AND LNC.TN = TCH.TN (teacher number)
- inferred → **LOC**: LNC.SC = LOC.CD (school code)
