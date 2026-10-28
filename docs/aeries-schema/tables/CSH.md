# CSH


Rows: 0 · Primary key: ID, SQ · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → CSE.ID |
| SQ | smallint |  |  |  |
| INS | nvarchar(3) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DS | nvarchar(7) |  |  |  |
| FP | nvarchar(3) |  |  |  |
| MD | nvarchar(1) |  |  |  |
| MF | nvarchar(1) |  |  |  |
| CFT | nvarchar(1) |  |  |  |
| EH | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CSE**: CSH.ID = CSE.ID
- inferred → **STU**: CSH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
