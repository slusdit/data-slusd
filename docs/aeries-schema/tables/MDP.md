# MDP

Stores Multi Data Profiles basic information

Rows: 5 · Primary key: SC, PI · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | int |  |  | → MST, LOC |
| PI | int |  |  |  |
| PN | varchar(100) |  |  |  |
| DT | datetime | yes |  |  |
| LY | int |  |  |  |
| OP | varchar(50) |  |  |  |
| SE | nvarchar(max) |  |  | → MST |
| GR | varchar(50) |  |  |  |
| FI | varchar(50) |  |  |  |
| NM | nvarchar(255) |  |  |  |
| WD | varchar(1) |  |  |  |
| CW | nvarchar(255) |  |  |  |
| VA | bit |  |  |  |
| PU | bit |  |  |  |
| DI | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **MST**: MDP.SC = MST.SC AND MDP.SE = MST.SE (section number)
- inferred → **LOC**: MDP.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **MDF**: MDF.SC = MDP.SC AND MDF.PI = MDP.PI
