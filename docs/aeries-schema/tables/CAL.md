# CAL

Class Attendance Log for use with Flex Scheduling

Rows: 0 · Primary key: ID, SCL, SQ · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| SCL | smallint |  |  |  |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| SE | smallint |  |  |  |
| FC | varchar(5) |  |  |  |
| OD | varchar(255) |  |  |  |
| ND | varchar(255) |  |  |  |
| UN | varchar(255) |  |  |  |
| IP | varchar(255) |  |  |  |
| SY | varchar(255) |  |  |  |
| DTM | datetime | yes |  |  |
| TID | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: CAL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
