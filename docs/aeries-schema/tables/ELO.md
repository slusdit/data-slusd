# ELO


Rows: 0 · Primary key: SC, TY, CD · Columns: 20

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → LOC.CD |
| TY | nvarchar(2) |  |  |  |
| CD | nvarchar(2) |  |  |  |
| MD | smallint |  |  |  |
| RC | bit |  |  |  |
| MI | bit |  |  |  |
| TI | bit |  |  |  |
| PA | bit |  |  |  |
| AI | bit |  |  |  |
| EE | bit |  |  |  |
| DPY | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUT | varchar(255) |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUT | varchar(255) |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **LOC**: ELO.SC = LOC.CD
- inferred → **LOC**: ELO.SC = LOC.CD (school code)
