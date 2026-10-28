# NWS

Stores Schools and District News Articles.

Rows: 0 · Primary key: SC, SQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | int |  |  | → LOC |
| SQ | int |  |  |  |
| DT | datetime |  |  |  |
| TI | nvarchar(255) |  |  |  |
| SM | nvarchar(max) |  |  |  |
| PTX | nvarchar(max) |  |  |  |
| MTX | nvarchar(max) |  |  |  |
| SRC | nvarchar(255) |  |  |  |
| ALT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: NWS.SC = LOC.CD (school code)
