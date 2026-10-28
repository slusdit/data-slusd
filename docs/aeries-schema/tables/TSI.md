# TSI

Temporary Student Information

Rows: 0 · Primary key: ID, SCL, FN, CT1, CT2, CT3 · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| SCL | smallint |  |  |  |
| FN | nvarchar(100) |  |  |  |
| CT1 | nvarchar(100) |  |  |  |
| CT2 | nvarchar(100) |  |  |  |
| CT3 | nvarchar(100) |  |  |  |
| VL | nvarchar(255) |  |  |  |
| UN | varchar(255) |  |  |  |
| GR | int |  |  |  |
| TG | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: TSI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
