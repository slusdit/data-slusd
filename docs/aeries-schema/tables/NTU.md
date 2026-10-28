# NTU


Rows: 2,730 · Primary key: NID, AID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| NID | varchar(50) |  |  | FK → NTF.NID |
| AID | int |  |  |  |
| RDT | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **NTF**: NTU.NID = NTF.NID
