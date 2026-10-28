# GTT

Stores information about tests administered to students pending GATE qualification.

Rows: 0 · Primary key: ID, SQ · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → GTE.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| CD | varchar(5) |  |  |  |
| SCR | money |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GTE**: GTT.ID = GTE.ID
- inferred → **STU**: GTT.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
