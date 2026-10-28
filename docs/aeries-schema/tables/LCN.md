# LCN

School Contacts

Rows: 170 · Primary key: SC, CD · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → LOC.CD |
| CD | nvarchar(3) |  |  |  |
| EM | nvarchar(150) |  |  |  |
| TL | nvarchar(10) |  |  |  |
| FX | nvarchar(10) |  |  |  |
| NM | nvarchar(max) |  |  |  |
| EX | nvarchar(24) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **LOC**: LCN.SC = LOC.CD
- inferred → **LOC**: LCN.SC = LOC.CD (school code)
