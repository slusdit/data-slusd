# AEF

Stores Adult Education data

Rows: 0 · Primary key: ID, FC, VL · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → AED.ID |
| FC | varchar(4) |  |  |  |
| VL | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **AED**: AEF.ID = AED.ID
- inferred → **STU**: AEF.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
