# SCN

School of Choice Request Notes

Rows: 0 · Primary key: ID, SQ, SQ1 · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → SCR.ID |
| SQ | int |  |  | FK → SCR.SQ |
| SQ1 | int |  |  |  |
| DT | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| SID | int |  |  |  |
| SUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SCR**: SCN.ID = SCR.ID AND SCN.SQ = SCR.SQ
- inferred → **STU**: SCN.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
