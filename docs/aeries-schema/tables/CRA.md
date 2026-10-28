# CRA

Contains which security groups can view each custom report.

Rows: 11 · Primary key: RID, UID · Columns: 4

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | int |  |  | FK → CRC.ID |
| UID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRC**: CRA.RID = CRC.ID
