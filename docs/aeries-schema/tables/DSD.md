# DSD

District supplemental student fields (column meanings are district-specific; see extended properties).

Aeries: District Supplemental Student demographics (up to 150 District developed fields)

Rows: 3,272 · Primary key: ID · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| h1 | varchar(10) |  | Home Type | COD DSD.h1 (10 codes) |
| h2 | varchar(10) |  | Shelter Name | COD DSD.h2 (6 codes) |
| h3 | varchar(20) |  | Case Worker Name |  |
| h4 | varchar(20) |  | Case Worker Phone |  |
| h5 | varchar(1) |  |  |  |
| h6 | varchar(1) |  |  |  |
| XX | varchar(50) |  |  |  |
| dc | varchar(1) |  | ASES | COD DSD.dc (7 codes) |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| SFA | nvarchar(3) |  | Summer Interest Form Application |  |

## Joins

- declared FK → **IDN**: DSD.ID = IDN.ID
- inferred → **STU**: DSD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
