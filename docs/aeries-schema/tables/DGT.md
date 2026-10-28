# DGT


Rows: 0 · Primary key: GID, SA · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GID | int |  |  | FK → DGP.GID |
| SA | varchar(6) |  |  |  |
| MTC | money |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DGP**: DGT.GID = DGP.GID
