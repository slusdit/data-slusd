# CER

Stores College Entrance Requirements for each student.

Rows: 111,328 · Primary key: ID, SA · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SA | varchar(5) |  |  |  |
| UR | money |  |  |  |
| UCC | money |  |  |  |
| UC | money |  |  |  |
| UN | money |  |  |  |
| CR | money |  |  |  |
| CCC | money |  |  |  |
| CC | money |  |  |  |
| CN | money |  |  | → CRS |
| UP | money |  |  |  |
| CP | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: CER.ID = IDN.ID
- inferred → **STU**: CER.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: CER.CN = CRS.CN (course number)
