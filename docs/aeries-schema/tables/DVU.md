# DVU

Data Validation Users

Rows: 6 · Primary key: GID, UID · Columns: 4

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GID | int |  |  | FK → DVG.GID |
| UID | int |  |  | FK → UGN.UID |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DVG**: DVU.GID = DVG.GID
- declared FK → **UGN**: DVU.UID = UGN.UID
