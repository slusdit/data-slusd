# SAP

Contains the actual Performance Indicator Scores each student – NEW 5 Levels

Rows: 0 · Primary key: SC, SN, KY · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → SAD.SC, STU.SC |
| SN | int |  |  | FK → STU.SN |
| KY | smallint |  |  | FK → SAD.KY |
| RS | smallint |  |  |  |
| QS | varchar(255) |  |  |  |
| GR | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SAD**: SAP.SC = SAD.SC AND SAP.KY = SAD.KY
- declared FK → **STU**: SAP.SC = STU.SC AND SAP.SN = STU.SN
- inferred → **STU**: SAP.SC = STU.SC AND SAP.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: SAP.SC = LOC.CD (school code)
