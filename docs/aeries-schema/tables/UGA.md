# UGA

Aeries Web security table to store User and Group Memberships.

Rows: 1,268 · Primary key: UID, GID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| UID | int |  |  | FK → UGN.UID |
| GID | int |  |  |  |
| IID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **UGN**: UGA.UID = UGN.UID
