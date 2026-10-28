# ADH

Stores a history of student address changes

Rows: 15,392 · Primary key: ID, SQ · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | int |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| AD | varchar(55) |  |  |  |
| CY | varchar(30) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| ZX | varchar(4) |  |  |  |
| RAD | varchar(55) |  |  |  |
| RCY | varchar(30) |  |  |  |
| RST | varchar(2) |  |  |  |
| RZC | varchar(5) |  |  |  |
| RZX | varchar(4) |  |  |  |
| SCL | smallint |  |  |  |
| CT | nvarchar(3) |  |  |  |
| RCT | nvarchar(3) |  |  |  |
| CN | nvarchar(2) |  |  | → CRS |
| RCN | nvarchar(2) |  |  |  |
| SCB | varchar(12) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ADH.ID = IDN.ID
- inferred → **STU**: ADH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: ADH.CN = CRS.CN (course number)
