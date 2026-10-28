# VND

Vendors for the Textbooks

Rows: 0 · Primary key: ID · Columns: 23

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| NM | varchar(100) |  |  |  |
| CP | varchar(50) |  |  |  |
| TI | varchar(25) |  |  |  |
| TL | varchar(10) |  |  |  |
| EX | varchar(5) |  |  |  |
| AD | varchar(70) |  |  |  |
| CY | varchar(40) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| ZX | varchar(4) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| U1 | varchar(1) |  |  |  |
| U2 | varchar(1) |  |  |  |
| U3 | varchar(1) |  |  |  |
| U4 | varchar(1) |  |  |  |
| U5 | varchar(1) |  |  |  |
| U6 | varchar(1) |  |  |  |
| U7 | varchar(1) |  |  |  |
| U8 | varchar(1) |  |  |  |
| FX | varchar(10) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: VND.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
