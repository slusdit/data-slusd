# IMR


Rows: 445,439 · Primary key: GUID, SQ · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GUID | nvarchar(255) |  |  | FK → IMJ.GUID |
| SQ | int |  |  |  |
| PKE | bit |  |  |  |
| STA | smallint |  |  |  |
| ERM | nvarchar(255) |  |  |  |
| NSQ | int |  |  |  |
| ND | nvarchar(max) |  |  |  |
| OD | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IMJ**: IMR.GUID = IMJ.GUID
