# EFJE


Rows: 0 · Primary key: EID · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  |  |
| JID | int |  |  | FK → EFJ.JID |
| ERR | nvarchar(max) |  |  |  |
| EC | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EFJ**: EFJE.JID = EFJ.JID
