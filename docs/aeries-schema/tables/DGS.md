# DGS

Stores Schools and Cohorts associated with each District Defined GPA

Rows: 0 · Primary key: GID, SCL, CHT · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GID | int |  |  | FK → DGP.GID |
| SCL | smallint |  |  |  |
| CHT | varchar(9) |  |  |  |
| IAC | bit |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| LR | bit |  |  |  |
| PG | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DGP**: DGS.GID = DGP.GID
