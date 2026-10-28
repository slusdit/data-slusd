# BGV

Stores course and data used to calculate Built-In GPAs.

Rows: 1,950,270 · Primary key: ID, SCL, SQ, GTY · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SCL | smallint |  |  |  |
| SQ | int |  |  |  |
| GTY | int |  |  |  |
| CR | money |  |  |  |
| GP | money |  |  |  |
| XG | bit |  |  |  |
| XR | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: BGV.ID = IDN.ID
- inferred → **STU**: BGV.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
