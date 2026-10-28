# SPC

Stores Staff pictures

Rows: 0 · Primary key: ID · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → STF.ID |
| RB | varbinary(max) | yes |  |  |
| TH | varbinary(max) | yes |  |  |
| SM | varbinary(max) | yes |  |  |
| MD | varbinary(max) | yes |  |  |
| LG | varbinary(max) | yes |  |  |
| XL | varbinary(max) | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STF**: SPC.ID = STF.ID
- inferred → **STU**: SPC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
