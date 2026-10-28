# CRI

Stores the definition of each custom report item.

Rows: 13 · Primary key: ID · Columns: 24

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| NM | nvarchar(20) |  |  |  |
| DE | nvarchar(255) |  |  |  |
| TY | varchar(50) |  |  |  |
| TBL | varchar(4) |  |  |  |
| FLD | varchar(4) |  |  |  |
| TID | varchar(20) |  |  |  |
| TPT | varchar(50) |  |  |  |
| DTO | smallint |  |  |  |
| TYR | smallint |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| TA | varchar(10) |  |  |  |
| WD | money |  |  |  |
| FB | varchar(50) |  |  |  |
| FV | varchar(50) |  |  |  |
| ES | bit |  |  |  |
| R1 | money |  |  |  |
| R2 | money |  |  |  |
| R3 | money |  |  |  |
| R4 | money |  |  |  |
| R5 | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: CRI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **CRG**: CRG.IID = CRI.ID
