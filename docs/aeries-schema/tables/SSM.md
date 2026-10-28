# SSM

Contains Staff records assigned to Scheduling Master Schedule sections

Rows: 0 · Primary key: SC, SE, ID · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → SMS.SC |
| SE | smallint |  |  | FK → SMS.SE |
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

- declared FK → **SMS**: SSM.SC = SMS.SC AND SSM.SE = SMS.SE
- inferred → **STU**: SSM.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **MST**: SSM.SC = MST.SC AND SSM.SE = MST.SE (section number)
- inferred → **LOC**: SSM.SC = LOC.CD (school code)
