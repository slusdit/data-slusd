# PNP

Aeries Web Only. Contains information about when parents want to receive Weekly Notification Emails.

Rows: 0 · Primary key: AID · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| AID | int |  |  | FK → PWA.AID |
| SPE | bit |  |  |  |
| DW | varchar(3) |  |  |  |
| TM | smallint |  |  |  |
| ELS | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **PWA**: PNP.AID = PWA.AID
