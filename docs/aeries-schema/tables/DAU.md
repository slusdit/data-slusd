# DAU

Alert Recipients, Responding User and Status of Response - Read, Unread, etc.

Rows: 0 · Primary key: NID, RID, RTY · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| NID | int |  |  | FK → DAA.NID |
| RID | int |  |  |  |
| RTY | nvarchar(6) |  |  |  |
| ST | nvarchar(6) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DAA**: DAU.NID = DAA.NID
