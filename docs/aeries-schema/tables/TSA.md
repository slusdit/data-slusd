# TSA

Aeries Web Only. Used by the Teacher Portal to store which students are linked to a teacher and how. Associated with the TAA table and populated dynamically when a teacher logs in to Aeries Web.

Rows: 306,507 · Primary key: UN, SC, SN, ID, LT, KY · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| UN | varchar(255) |  |  |  |
| SC | smallint |  |  | → STU, LOC |
| SN | int |  |  | → STU |
| ID | int |  |  |  |
| LT | varchar(50) |  |  |  |
| KY | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: TSA.SC = STU.SC AND TSA.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: TSA.SC = LOC.CD (school code)
