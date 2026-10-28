# SMP


Rows: 0 · Primary key: SC, CD, SE · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → SMS.SC, SPK.SC |
| CD | varchar(6) |  |  | FK → SPK.CD |
| SE | smallint |  |  | FK → SMS.SE |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SMS**: SMP.SC = SMS.SC AND SMP.SE = SMS.SE
- declared FK → **SPK**: SMP.SC = SPK.SC AND SMP.CD = SPK.CD
- inferred → **MST**: SMP.SC = MST.SC AND SMP.SE = MST.SE (section number)
- inferred → **LOC**: SMP.SC = LOC.CD (school code)
