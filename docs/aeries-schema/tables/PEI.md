# PEI

Pre-Enrollment Information

Rows: 0 · Primary key: ID, SCL · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SCL | smallint |  |  | FK → LOC.CD |
| TR | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: PEI.ID = IDN.ID
- declared FK → **LOC**: PEI.SCL = LOC.CD
- inferred → **STU**: PEI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
