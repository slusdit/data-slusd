# RFD


Rows: 0 · Primary key: ID, SQ, SQ1 · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → RFH.ID |
| SQ | smallint |  |  | FK → RFH.SQ |
| SQ1 | smallint |  |  |  |
| ESD | datetime | yes |  |  |
| GR | smallint |  |  |  |
| SE | nvarchar(9) |  |  |  |
| SAZ | nvarchar(9) |  |  |  |
| EF | nvarchar(1) |  |  |  |
| SP | nvarchar(1) |  |  |  |
| OSS | smallint |  |  |  |
| RDL | smallint |  |  |  |
| SDL | smallint |  |  |  |
| PIS | nvarchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **RFH**: RFD.ID = RFH.ID AND RFD.SQ = RFH.SQ
- inferred → **STU**: RFD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
