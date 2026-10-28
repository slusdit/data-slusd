# PSS

Contains postsecondary survey results from students 6-12 months after their High School Completion

Rows: 1 · Primary key: ID, SQ · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| CD | nvarchar(3) |  |  |  |
| EIT | nvarchar(2) |  |  |  |
| IFC | nvarchar(3) |  |  |  |
| PSC | nvarchar(2) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: PSS.ID = IDN.ID
- inferred → **STU**: PSS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
