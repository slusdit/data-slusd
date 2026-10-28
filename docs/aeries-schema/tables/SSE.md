# SSE

Contains Staff records assigned to Master Schedule sections

Rows: 0 · Primary key: SC, SE, ID, SQ · Columns: 23

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → MST.SC |
| SE | smallint |  |  | FK → MST.SE |
| ID | int |  |  | → STU |
| PR | bit |  |  |  |
| SR | varchar(3) |  |  |  |
| TG | varchar(1) |  |  |  |
| ATP | varchar(1) |  |  |  |
| GBP | varchar(1) |  |  |  |
| GR | varchar(1) |  |  |  |
| SAC | varchar(1) |  |  |  |
| STR | varchar(1) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| TP | nvarchar(3) |  |  |  |
| SQ | smallint |  |  |  |
| PPR | bit |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **MST**: SSE.SC = MST.SC AND SSE.SE = MST.SE
- inferred → **STU**: SSE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **MST**: SSE.SC = MST.SC AND SSE.SE = MST.SE (section number)
- inferred → **LOC**: SSE.SC = LOC.CD (school code)
