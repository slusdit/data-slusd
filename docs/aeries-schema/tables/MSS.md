# MSS

Contains Master Schedule Settings for use with Google Classrooms.

Rows: 542 · Primary key: SC, SE, NM · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → MST.SC |
| SE | smallint |  |  | FK → MST.SE |
| NM | varchar(255) |  |  |  |
| SV | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **MST**: MSS.SC = MST.SC AND MSS.SE = MST.SE
- inferred → **MST**: MSS.SC = MST.SC AND MSS.SE = MST.SE (section number)
- inferred → **LOC**: MSS.SC = LOC.CD (school code)
