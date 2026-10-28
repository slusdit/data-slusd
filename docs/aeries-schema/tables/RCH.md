# RCH

Aeries Web Only. Contains a running history of report cards that have been created at the end of each marking period.

Rows: 78,931 · Primary key: ID, SCL, YR, TM, TY, GP · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SCL | int |  |  |  |
| YR | int |  |  |  |
| TM | int |  |  |  |
| TY | varchar(3) |  |  |  |
| GR | int |  |  |  |
| REN | varbinary(max) | yes |  |  |
| RCL | varbinary(max) | yes |  |  |
| CL | varchar(2) |  |  |  |
| TMD | varchar(50) |  |  |  |
| RPT | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| GP | nvarchar(10) |  |  |  |
| UG | bit |  |  |  |
| LVD | datetime | yes |  |  |
| LVE | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: RCH.ID = IDN.ID
- inferred → **STU**: RCH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
