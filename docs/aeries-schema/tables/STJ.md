# STJ

Contains job classifications and assignments for each staff member.

Rows: 1,320 · Primary key: ID, SQ · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → STF.ID |
| SQ | smallint |  |  |  |
| JC | varchar(3) |  |  | COD STJ.JC (6 codes) |
| FTE | money |  |  |  |
| NC1 | varchar(4) |  |  |  |
| NC2 | varchar(4) |  |  |  |
| NC3 | varchar(4) |  |  |  |
| NC4 | varchar(4) |  |  |  |
| NC5 | varchar(4) |  |  |  |
| NC6 | varchar(4) |  |  |  |
| NC7 | varchar(4) |  |  |  |
| SCL | smallint |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| MMN | smallint |  |  |  |
| SVC | nvarchar(8) |  |  |  |
| PSV | nvarchar(2) |  |  |  |
| NOS | int |  |  |  |
| IT | varchar(2) |  |  |  |
| GR | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STF**: STJ.ID = STF.ID
- inferred → **STU**: STJ.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Used in views

`ELLEVATION_ListPersonData`
