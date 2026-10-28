# SBS

Stores Standards-Based Templates.

Rows: 62 · Primary key: ID · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| GR | smallint |  |  |  |
| TY | varchar(1) |  |  |  |
| NM | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: SBS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **SBD**: SBD.ID = SBS.ID
