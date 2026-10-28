# SSU

Stores multiple sets of Staff Section data from SSM based on the number of backups made.

Rows: 0 · Primary key: SC, SEQ, SE, ID · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → SBU.SC |
| SEQ | int |  |  | FK → SBU.SEQ |
| SE | smallint |  |  | → MST |
| ID | int |  |  | → STU |
| PR | bit |  |  |  |
| SR | varchar(3) |  |  |  |
| TG | varchar(1) |  |  |  |
| ATP | varchar(1) |  |  |  |
| GBP | varchar(1) |  |  |  |
| GR | varchar(1) |  |  |  |
| SAC | varchar(1) |  |  |  |
| STR | varchar(1) |  |  |  |
| TP | nvarchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SBU**: SSU.SC = SBU.SC AND SSU.SEQ = SBU.SEQ
- inferred → **STU**: SSU.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **MST**: SSU.SC = MST.SC AND SSU.SE = MST.SE (section number)
- inferred → **LOC**: SSU.SC = LOC.CD (school code)
