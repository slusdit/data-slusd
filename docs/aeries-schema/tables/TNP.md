# TNP

Stores specific Test ID's and the total number that is possible for each part.

Rows: 7,026 · Primary key: TC, ID, GR, PT, TA, FC · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TC | varchar(4) |  |  |  |
| ID | varchar(8) |  |  | → STU |
| PT | smallint |  |  |  |
| TA | varchar(6) |  |  |  |
| FC | varchar(4) |  |  |  |
| NP | int |  |  |  |
| GR | smallint |  |  |  |
| S0 | smallint |  |  |  |
| S1 | smallint |  |  |  |
| S2 | smallint |  |  |  |
| S3 | smallint |  |  |  |
| S4 | smallint |  |  |  |
| S5 | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: TNP.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
