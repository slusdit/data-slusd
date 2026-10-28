# ZFS


Rows: 308 · Primary key: SC, NM, FN · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| NM | varchar(20) |  |  |  |
| FN | varchar(100) |  |  |  |
| AC | varchar(4) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: ZFS.SC = LOC.CD (school code)
