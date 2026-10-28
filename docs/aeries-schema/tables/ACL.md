# ACL

Maintains a log of when and where new PAC files and DAC tables are created

Rows: 0 · Primary key: SC, DT · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| DT | datetime |  |  |  |
| UN | varchar(50) |  |  |  |
| WK | smallint |  |  |  |
| SS | varchar(5) |  |  |  |
| PP | varchar(100) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: ACL.SC = LOC.CD (school code)
