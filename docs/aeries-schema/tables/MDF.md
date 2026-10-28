# MDF

Stores Multi Data Profiles Fields to be included

Rows: 13 · Primary key: SC, PI, SQ · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | int |  |  | FK → MDP.SC |
| PI | int |  |  | FK → MDP.PI |
| SQ | int |  |  |  |
| ID | varchar(50) |  |  | → STU |
| PT | varchar(50) |  |  |  |
| TN | varchar(4) |  |  | → TCH |
| FN | varchar(10) |  |  |  |
| FD | nvarchar(255) |  |  |  |
| FM | varchar(50) |  |  |  |
| QY | nvarchar(255) |  |  |  |
| R1 | int |  |  |  |
| R2 | int |  |  |  |
| R3 | int |  |  |  |
| R4 | int |  |  |  |
| R5 | int |  |  |  |
| DTO | smallint |  |  |  |
| DT1 | datetime | yes |  |  |
| DT2 | datetime | yes |  |  |
| TA | varchar(6) |  |  |  |
| SQ1 | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **MDP**: MDF.SC = MDP.SC AND MDF.PI = MDP.PI
- inferred → **STU**: MDF.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **TCH**: MDF.SC = TCH.SC AND MDF.TN = TCH.TN (teacher number)
- inferred → **LOC**: MDF.SC = LOC.CD (school code)
