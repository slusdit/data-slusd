# PIC

Stores student pictures. The table is ID based and it is not cached because of its potential big size.

Rows: 27,277 · Primary key: ID, YR · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| YR | smallint |  |  |  |
| RB | varbinary(max) | yes |  |  |
| XT | varchar(255) |  |  |  |
| SZ | int |  |  |  |
| TH | varbinary(max) | yes |  |  |
| SM | varbinary(max) | yes |  |  |
| MD | varbinary(max) | yes |  |  |
| LG | varbinary(max) | yes |  |  |
| XL | varbinary(max) | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: PIC.ID = IDN.ID
- inferred → **STU**: PIC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
