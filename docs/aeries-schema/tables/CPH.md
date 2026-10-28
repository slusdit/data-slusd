# CPH

Stores Career Pathways History for each student.

Rows: 11,561 · Primary key: ID, CD, SQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → CPW.ID |
| CD | varchar(3) |  |  | FK → CPW.CD |
| SQ | smallint |  |  |  |
| AY | varchar(9) |  |  |  |
| SCL | smallint |  |  |  |
| CO | nvarchar(max) |  |  |  |
| LVL | nvarchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CPW**: CPH.ID = CPW.ID AND CPH.CD = CPW.CD
- inferred → **STU**: CPH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
