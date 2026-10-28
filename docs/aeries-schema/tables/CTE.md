# CTE

Career Technical Education, used by CALPADS. The information in this table is visible from the Students form, Student Secondary Data tab

Rows: 2,076 · Primary key: ID, SQ · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| CD | varchar(3) |  |  |  |
| AY | varchar(9) |  |  |  |
| SCL | smallint |  |  |  |
| CM | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: CTE.ID = IDN.ID
- inferred → **STU**: CTE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
