# WGM

Contains global messages displayed to users

Rows: 1 · Primary key: SC, SQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| TI | varchar(255) |  |  |  |
| MS | nvarchar(max) |  |  |  |
| ED | datetime | yes |  |  |
| TG | varchar(1) |  |  |  |
| ST | bit |  |  |  |
| SP | bit |  |  |  |
| SU | bit |  |  |  |
| SS | bit |  |  |  |
| SQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: WGM.SC = LOC.CD (school code)
