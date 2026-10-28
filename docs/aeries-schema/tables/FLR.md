# FLR

Contains definitions of field length record used by the Import Fixed Length Files form - Can be DISTRICT MANAGED.

Rows: 2,660 · Primary key: ID, FC · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | varchar(255) |  |  | FK → FLF.ID |
| FC | varchar(6) |  |  |  |
| SQ | int |  |  |  |
| SZ | varchar(3) |  |  |  |
| TP | varchar(25) |  |  |  |
| DE | varchar(100) |  |  |  |
| SP | varchar(4) |  |  |  |
| ATC | varchar(4) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **FLF**: FLR.ID = FLF.ID
- inferred → **STU**: FLR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
