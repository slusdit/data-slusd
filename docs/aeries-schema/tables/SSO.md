# SSO

Aeries Web Only. Contains temporary information for facilitating Single-Sign-On capabilities with 3rd party systems.

Rows: 953 · Primary key: UID · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| UID | int |  |  | FK → UGN.UID |
| AK | varchar(255) |  |  |  |
| EID | int |  |  |  |
| SCU | nvarchar(255) |  |  |  |
| GEM | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **UGN**: SSO.UID = UGN.UID
