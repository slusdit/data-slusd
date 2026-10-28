# SRD

Synchronization Review Date

Rows: 0 · Primary key: ID, TBL · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| TBL | varchar(50) |  |  |  |
| RD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SRD.ID = IDN.ID
- inferred → **STU**: SRD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
