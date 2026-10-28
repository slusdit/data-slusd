# SCR

School of Choice Requests

Rows: 0 · Primary key: ID, SQ · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | int |  |  |  |
| YR | nvarchar(9) |  |  |  |
| DS | datetime | yes |  |  |
| RTW | nvarchar(3) |  |  |  |
| ITS | nvarchar(1) |  |  |  |
| ITN | nvarchar(1) |  |  |  |
| ITD | nvarchar(7) |  |  |  |
| GR | smallint |  |  |  |
| HS | int |  |  |  |
| SC1 | int |  |  |  |
| SC2 | int |  |  |  |
| SE | nvarchar(1) |  |  |  |
| FF | nvarchar(1) |  |  |  |
| SIB | nvarchar(3) |  |  |  |
| SID | nvarchar(50) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SCR.ID = IDN.ID
- inferred → **STU**: SCR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **SCD**: SCD.ID = SCR.ID AND SCD.SQ = SCR.SQ
- **SCN**: SCN.ID = SCR.ID AND SCN.SQ = SCR.SQ
