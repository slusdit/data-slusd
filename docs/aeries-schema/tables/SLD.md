# SLD

Aeries Web Only. Contains the specific Service Learning Requirements and Service Learning Hours Completed for each student for each grade level.

Rows: 577 · Primary key: ID · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| R9 | money |  |  |  |
| R10 | money |  |  |  |
| R11 | money |  |  |  |
| R12 | money |  |  |  |
| E9 | money |  |  |  |
| E10 | money |  |  |  |
| E11 | money |  |  |  |
| E12 | money |  |  |  |
| HR | money |  |  |  |
| CID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SLD.ID = IDN.ID
- inferred → **STU**: SLD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **SLR**: SLR.ID = SLD.ID
