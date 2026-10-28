# FPS

Aeries Web Only. Contains Payment Schedules for each student.

Rows: 0 · Primary key: ID, SQ · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | int |  |  |  |
| DT | datetime | yes |  |  |
| AD | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FPS.ID = IDN.ID
- inferred → **STU**: FPS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
