# DCA

Document Archive

Rows: 130 · Primary key: DID, VID, CL · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| DID | varchar(255) |  |  | FK → DCS.DID |
| VID | varchar(255) |  |  |  |
| CL | varchar(2) |  |  | FK → DCS.CL |
| UN | varchar(255) |  |  |  |
| DC | varbinary(max) | yes |  |  |
| TY | varchar(255) |  |  |  |
| FN | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| TI | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DCS**: DCA.DID = DCS.DID AND DCA.CL = DCS.CL
