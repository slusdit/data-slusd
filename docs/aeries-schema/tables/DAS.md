# DAS

Aeries Web Only. Stores a summary of student level qualifications to different Aeries Analytics Analysis Items by school and grade

Rows: 12,912 · Primary key: AID, SCL, GR · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| AID | varchar(255) |  |  | FK → DAI.AID |
| SCL | smallint |  |  |  |
| GR | smallint |  |  |  |
| TS | int |  |  |  |
| TL1 | int |  |  |  |
| TL2 | int |  |  |  |
| TL3 | int |  |  |  |
| TL4 | int |  |  |  |
| TL5 | int |  |  |  |
| TL6 | int |  |  |  |
| TL7 | int |  |  |  |
| TL8 | int |  |  |  |
| TL9 | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DAI**: DAS.AID = DAI.AID
