# LEC

Stores which Absence Codes (ABS) count towards each Letter in LET – Can be DISTRICT MANAGED.

Rows: 1,196 · Primary key: SC, ID, CD · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| ID | varchar(255) |  |  | → STU |
| CD | varchar(6) |  |  |  |
| IC | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: LEC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: LEC.SC = LOC.CD (school code)
