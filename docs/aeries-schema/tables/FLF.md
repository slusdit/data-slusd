# FLF

Contains definitions of field length files used by the Import Fixed Length Files form - Can be DISTRICT MANAGED.

Rows: 40 · Primary key: ID · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | varchar(255) |  |  | → STU |
| DE | varchar(50) |  |  |  |
| IE | varchar(1) |  |  |  |
| CN | varchar(2) |  |  | → CRS |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: FLF.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: FLF.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **FLR**: FLR.ID = FLF.ID
