# DIG

Aeries Web Only. Aeries Analytics Dashboard – stores which dashboard items are on each dashboard

Rows: 119 · Primary key: IID, DID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| IID | int |  |  | FK → DIO.IID |
| DID | int |  |  |  |
| SQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DIO**: DIG.IID = DIO.IID
