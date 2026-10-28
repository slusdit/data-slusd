# CAT

Class Attendance for use with Flex Scheduling

Rows: 0 · Primary key: ID, SCL, SE, DT, SQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SCL | smallint |  |  |  |
| SQ | smallint |  |  |  |
| SE | smallint |  |  |  |
| DT | datetime |  |  |  |
| SID | int |  |  |  |
| AC | varchar(1) |  |  |  |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| TT | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: CAT.ID = IDN.ID
- inferred → **STU**: CAT.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
