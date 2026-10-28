# SLH

Service Learning Hours

Rows: 570 · Primary key: ID, CD · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| CD | varchar(50) |  |  |  |
| R9 | money |  |  |  |
| R10 | money |  |  |  |
| R11 | money |  |  |  |
| R12 | money |  |  |  |
| S9 | money |  |  |  |
| S10 | money |  |  |  |
| S11 | money |  |  |  |
| S12 | money |  |  |  |
| P9 | money |  |  |  |
| P10 | money |  |  |  |
| P11 | money |  |  |  |
| P12 | money |  |  |  |
| TS | money |  |  |  |
| TP | money |  |  |  |
| HR | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SLH.ID = IDN.ID
- inferred → **STU**: SLH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
