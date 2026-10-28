# GRC

Valid marks and their grade points / credit rules (decodes GRD.M*, HIS.MK).

Aeries: Contains all the possible Grades or Marks and descriptions that might be given to a student - Can be DISTRICT MANAGED.

Rows: 595 · Primary key: SC, MK · Columns: 20

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| MK | varchar(3) |  |  | COD GRC.MK (16 codes) |
| PT | money |  |  |  |
| PH | money |  |  |  |
| CA | bit |  |  |  |
| CC | bit |  |  |  |
| CG | bit |  |  |  |
| SQ | int |  |  |  |
| PN | money |  |  |  |
| LP | money |  |  |  |
| HP | money |  |  |  |
| MT | varchar(3) |  |  |  |
| PA | money |  |  |  |
| GR | smallint |  |  |  |
| GT | money |  |  |  |
| GH | money |  |  |  |
| GN | money |  |  |  |
| GA | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: GRC.SC = LOC.CD (school code)
