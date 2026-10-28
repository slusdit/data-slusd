# DDS

District Data Sharing

Rows: 0 · Primary key: ID, CDS · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| CDS | varchar(255) |  |  |  |
| OID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: DDS.ID = IDN.ID
- inferred → **STU**: DDS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
