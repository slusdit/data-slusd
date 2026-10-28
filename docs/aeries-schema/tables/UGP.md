# UGP

Aeries Web security table to store permissions granted to Users and Groups.

Rows: 53,010 · Primary key: SC, UID, TC, FC, YR · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| UID | int |  |  | FK → UGN.UID |
| TC | varchar(255) |  |  |  |
| FC | varchar(255) |  |  |  |
| RD | tinyint |  |  |  |
| UP | tinyint |  |  |  |
| INS | tinyint |  |  |  |
| DL | tinyint |  |  |  |
| MU | tinyint |  |  |  |
| AD | tinyint |  |  |  |
| YR | tinyint |  |  |  |
| UXD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **UGN**: UGP.UID = UGN.UID
- inferred → **LOC**: UGP.SC = LOC.CD (school code)
