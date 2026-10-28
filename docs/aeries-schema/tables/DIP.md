# DIP

Aeries Web Only. Table for Dashboard Item Push Sharing

Rows: 37 · Primary key: IID, UID · Columns: 4

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| IID | int |  |  | FK → DIO.IID |
| UID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DIO**: DIP.IID = DIO.IID
