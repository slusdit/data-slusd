# LET

Stores Letter data (similar to existing LTR table) – Can be DISTRICT MANAGED.

Rows: 256 · Primary key: SC, ID, PT, HL · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| ID | varchar(255) |  |  | → STU |
| PT | smallint |  |  |  |
| HL | varchar(2) |  |  |  |
| TY | varchar(1) |  |  |  |
| NO | smallint |  |  |  |
| T1 | nvarchar(max) |  |  |  |
| T2 | nvarchar(max) |  |  |  |
| SL | bit |  |  |  |
| SM | nvarchar(max) |  |  |  |
| INV | varchar(2) |  |  |  |
| CT | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: LET.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: LET.SC = LOC.CD (school code)
