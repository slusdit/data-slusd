# DGV

Stores course and data used to calculate each active District GPA.

Rows: 0 · Primary key: ID, SCL, SQ, GID, SA · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SCL | smallint |  |  |  |
| SQ | int |  |  |  |
| GID | int |  |  |  |
| SA | varchar(6) |  |  |  |
| WF | int |  |  |  |
| CR | money |  |  |  |
| GP | money |  |  |  |
| XG | bit |  |  |  |
| XR | varchar(255) |  |  |  |
| NGP | money |  |  |  |
| NWF | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: DGV.ID = IDN.ID
- inferred → **STU**: DGV.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
