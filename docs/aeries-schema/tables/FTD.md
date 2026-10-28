# FTD

Aeries Web Only. Contains record of credits and debits for each student.

Rows: 0 · Primary key: TID · Columns: 27

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TID | varchar(255) |  |  |  |
| ID | int |  |  | FK → FTS.ID |
| DT | datetime | yes |  |  |
| AM | money |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| SQ | int |  |  |  |
| RN | bit |  |  |  |
| TR | bit |  |  |  |
| GT | bit |  |  |  |
| DE | varchar(255) |  |  |  |
| USR | varchar(255) |  |  |  |
| IP | varchar(255) |  |  |  |
| PT | varchar(6) |  |  | COD FTD.PT (3 codes) |
| ETID | int |  |  |  |
| ST | varchar(1) |  |  |  |
| CK | varchar(50) |  |  |  |
| SCL | int |  |  |  |
| CD | varchar(6) |  |  |  |
| TT | varchar(1) |  |  |  |
| PD | money |  |  |  |
| RID | int |  |  |  |
| RIN | int |  |  |  |
| FT | varchar(1) |  |  |  |
| SRT | smallint |  |  |  |
| SIN | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **FTS**: FTD.ID = FTS.ID
- inferred → **STU**: FTD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: FTD.CN = CRS.CN (course number)
