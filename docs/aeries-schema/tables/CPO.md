# CPO

Stores Career Pathways Outcomes for each student.

Rows: 1 · Primary key: ID, CD, SQ · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → CPW.ID |
| CD | varchar(3) |  |  | COD CPO.CD (2 codes); FK → CPW.CD |
| SQ | smallint |  |  |  |
| OC | varchar(3) |  |  | COD CPO.OC (5 codes) |
| CO | nvarchar(max) |  |  |  |
| OD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CPW**: CPO.ID = CPW.ID AND CPO.CD = CPW.CD
- inferred → **STU**: CPO.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
