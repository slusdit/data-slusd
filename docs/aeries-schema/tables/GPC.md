# GPC

Stores definition of weighted grading

Rows: 0 · Primary key: SC, GP1, GP2 · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → GPD.SC |
| GP1 | nvarchar(10) |  |  | FK → GPD.GP |
| GP2 | nvarchar(10) |  |  |  |
| PC | money |  |  |  |
| TBL | varchar(6) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GPD**: GPC.SC = GPD.SC AND GPC.GP1 = GPD.GP
- inferred → **LOC**: GPC.SC = LOC.CD (school code)
