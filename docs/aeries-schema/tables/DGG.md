# DGG

Stores grade points for weight factors added to District Defined GPAs.

Rows: 0 · Primary key: WF, MK · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| WF | int |  |  | FK → DGW.WF |
| MK | varchar(3) |  |  |  |
| GP | money |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| XG | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DGW**: DGG.WF = DGW.WF
