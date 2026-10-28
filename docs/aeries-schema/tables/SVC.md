# SVC


Rows: 0 · Primary key: SC, ID · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| ID | nvarchar(12) |  |  | → STU |
| RD | datetime | yes |  |  |
| REQ | nvarchar(6) |  |  |  |
| ST | nvarchar(6) |  |  |  |
| SDD | datetime | yes |  |  |
| DR | nvarchar(6) |  |  |  |
| OD | datetime | yes |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: SVC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: SVC.SC = LOC.CD (school code)
