# CPE

Stores Career Pathways Experiences for each student.

Rows: 0 · Primary key: ID, CD, SQ · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → CPW.ID |
| CD | varchar(3) |  |  | FK → CPW.CD |
| SQ | smallint |  |  |  |
| TY | varchar(3) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| NM | varchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| CT | varchar(3) |  |  |  |
| AM | varchar(255) |  |  |  |
| HR | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CPW**: CPE.ID = CPW.ID AND CPE.CD = CPW.CD
- inferred → **STU**: CPE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
