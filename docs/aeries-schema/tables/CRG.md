# CRG

Stores which custom report items are on each custom report.

Rows: 11 · Primary key: RID, IID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | int |  |  | FK → CRC.ID |
| IID | int |  |  | FK → CRI.ID |
| SRT | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRC**: CRG.RID = CRC.ID
- declared FK → **CRI**: CRG.IID = CRI.ID
