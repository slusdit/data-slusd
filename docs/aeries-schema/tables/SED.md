# SED

Scheduling Exclusions

Rows: 8 · Primary key: EID · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  |  |
| SCL | smallint |  |  |  |
| ID | int |  |  | FK → IDN.ID |
| TY | varchar(1) |  |  |  |
| ID2 | int |  |  |  |
| TC | varchar(5) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SED.ID = IDN.ID
- inferred → **STU**: SED.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
