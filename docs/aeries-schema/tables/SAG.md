# SAG

Stores Student Assessment Definition levels by grade

Rows: 0 · Primary key: SC, KY, GR · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → SAD.SC |
| KY | smallint |  |  | FK → SAD.KY |
| GR | smallint |  |  |  |
| TL | smallint |  |  |  |
| TH | smallint |  |  |  |
| BTL | smallint |  |  |  |
| BTH | smallint |  |  |  |
| ATL | smallint |  |  |  |
| ATH | smallint |  |  |  |
| GB | varchar(8) |  |  |  |
| GM | varchar(8) |  |  |  |
| GA | varchar(8) |  |  |  |
| GBX | varchar(8) |  |  |  |
| GAX | varchar(8) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SAD**: SAG.SC = SAD.SC AND SAG.KY = SAD.KY
- inferred → **LOC**: SAG.SC = LOC.CD (school code)
