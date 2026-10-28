# CRC

Stores the definition of each custom report.

Rows: 4 · Primary key: ID · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| NM | nvarchar(255) |  |  |  |
| UID | int |  |  |  |
| CS | bit |  |  |  |
| STY | varchar(10) |  |  |  |
| LID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: CRC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **CRA**: CRA.RID = CRC.ID
- **CRG**: CRG.RID = CRC.ID
