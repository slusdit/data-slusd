# CRL

Contains descriptions and colors for each of the 5 test levels.

Rows: 0 · Primary key: ID · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| NM | varchar(255) |  |  |  |
| DE1 | varchar(255) |  |  |  |
| CL1 | varchar(6) |  |  |  |
| DE2 | varchar(255) |  |  |  |
| CL2 | varchar(6) |  |  |  |
| DE3 | varchar(255) |  |  |  |
| CL3 | varchar(6) |  |  |  |
| DE4 | varchar(255) |  |  |  |
| CL4 | varchar(6) |  |  |  |
| DE5 | varchar(255) |  |  |  |
| CL5 | varchar(6) |  |  |  |
| UID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: CRL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
