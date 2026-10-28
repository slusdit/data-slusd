# DLH

Contains multi-year data for student participation in Dual Language Immersion programs

Rows: 0 · Primary key: ID, SQ · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | int |  |  |  |
| YR | varchar(9) |  |  |  |
| HL | varchar(2) |  |  |  |
| PDT | datetime | yes |  |  |
| CF | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: DLH.ID = IDN.ID
- inferred → **STU**: DLH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
