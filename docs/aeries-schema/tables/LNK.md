# LNK

Stores the URLs for the Online Resource Center

Rows: 0 · Primary key: SC, UT, SO · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| UT | varchar(1) |  |  |  |
| SO | smallint |  |  |  |
| URL | varchar(255) |  |  |  |
| NM | varchar(100) |  |  |  |
| DE | varchar(255) |  |  |  |
| ED | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: LNK.SC = LOC.CD (school code)
