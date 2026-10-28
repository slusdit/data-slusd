# SCG

School Group School assignments

Rows: 0 · Primary key: SC, CD · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → LOC.CD |
| CD | nvarchar(6) |  |  |  |
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

- declared FK → **LOC**: SCG.SC = LOC.CD
- inferred → **LOC**: SCG.SC = LOC.CD (school code)
