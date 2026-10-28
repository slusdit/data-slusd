# LAF

Contains a test history of Oral Language Assessments test taken by the student – Can be DISTRICT MANAGED.

Rows: 333 · Primary key: ID, SQ · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → LAC.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| FS | smallint |  |  |  |
| FL | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| GR | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **LAC**: LAF.ID = LAC.ID
- inferred → **STU**: LAF.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
