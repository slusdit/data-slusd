# DIT


Rows: 0 · Primary key: ID · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| NM | nvarchar(255) |  |  |  |
| DE | nvarchar(max) |  |  |  |
| IMG | varbinary(max) | yes |  |  |
| ITN | varbinary(max) | yes |  |  |
| CN | varchar(6) |  |  | → CRS |
| SCL | smallint |  |  |  |
| SE | smallint |  |  |  |
| CAT | nvarchar(255) |  |  |  |
| SUB | nvarchar(255) |  |  |  |
| PPL | varchar(255) |  |  |  |
| MSG | nvarchar(max) |  |  |  |
| OSS | nvarchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: DIT.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: DIT.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **DOF**: DOF.IID = DIT.ID
