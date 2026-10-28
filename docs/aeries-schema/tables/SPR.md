# SPR

Contains details of Special Programs in which all students at a school are participating

Rows: 0 · Primary key: SC, SQ · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → LOC.CD |
| SQ | int |  |  |  |
| CD | varchar(2) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **LOC**: SPR.SC = LOC.CD
- inferred → **LOC**: SPR.SC = LOC.CD (school code)
