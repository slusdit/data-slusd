# SCD

School of Choice Decisions

Rows: 0 · Primary key: ID, SQ · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → SCR.ID |
| SQ | int |  |  | FK → SCR.SQ |
| YR | nvarchar(9) |  |  |  |
| RT | nvarchar(3) |  |  |  |
| LI | nvarchar(50) |  |  |  |
| ITP | nvarchar(3) |  |  |  |
| IEP | nvarchar(1) |  |  |  |
| SR | nvarchar(5) |  |  |  |
| ST1 | nvarchar(3) |  |  |  |
| ST2 | nvarchar(3) |  |  |  |
| SUN | nvarchar(255) |  |  |  |
| DNQ1 | nvarchar(3) |  |  |  |
| DNQ2 | nvarchar(3) |  |  |  |
| APS | int |  |  |  |
| DDT | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| ES | nvarchar(1) |  |  |  |
| ET | nvarchar(max) |  |  |  |
| WS | nvarchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SCR**: SCD.ID = SCR.ID AND SCD.SQ = SCR.SQ
- inferred → **STU**: SCD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
