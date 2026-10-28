# ICL

Table used by Parent Data Confirmation to store what and when data is confirmed by the parent.

Rows: 186,536 · Primary key: SC, SN, SQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| SQ | smallint |  |  |  |
| DT | datetime |  |  |  |
| TC | varchar(50) |  |  |  |
| AID | int |  |  |  |
| NM | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: ICL.SC = STU.SC AND ICL.SN = STU.SN
- inferred → **STU**: ICL.SC = STU.SC AND ICL.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: ICL.SC = LOC.CD (school code)

## Used in saved reports

"Projected CALPADS UPP (%)"
