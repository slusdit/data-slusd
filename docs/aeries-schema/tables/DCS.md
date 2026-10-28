# DCS

Table used by Parent Data Confirmation to store the basic info about each Document and the document itself

Rows: 15 · Primary key: DID, CL · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| DID | varchar(255) |  |  | FK → DCV.DID |
| TI | nvarchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| SR | bit |  |  |  |
| SO | money |  |  |  |
| RC | bit |  |  |  |
| CT | varchar(3) |  |  |  |
| DC | varbinary(max) | yes |  |  |
| TY | varchar(255) |  |  |  |
| FG | varchar(3) |  |  |  |
| FN | varchar(255) |  |  |  |
| AIR | bit |  |  |  |
| CL | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DCV**: DCS.DID = DCV.DID

## Referenced by (declared FKs)

- **DCA**: DCA.DID = DCS.DID AND DCA.CL = DCS.CL
- **DCL**: DCL.DID = DCS.DID AND DCL.CL = DCS.CL
