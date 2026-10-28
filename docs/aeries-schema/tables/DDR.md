# DDR

Discount Rates

Rows: 0 · Primary key: ID · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| NM | varchar(255) |  |  |  |
| TC | varchar(10) |  |  |  |
| FC | varchar(50) |  |  |  |
| FVL | varchar(255) |  |  |  |
| AM | money |  |  |  |
| TY | tinyint |  |  |  |
| COM | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: DDR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
