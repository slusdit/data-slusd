# EXG

Aeries Web Only. Aeries Analytics Table for Exam Passage Text Groups.

Rows: 0 · Primary key: TID, GID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TID | int |  |  | FK → EXT.TID |
| GID | int |  |  |  |
| SQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXT**: EXG.TID = EXT.TID
