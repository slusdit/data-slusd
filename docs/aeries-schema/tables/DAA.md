# DAA

Alert and Responses Sent and Received

Rows: 0 · Primary key: NID · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| NID | int |  |  |  |
| PG | nvarchar(255) |  |  |  |
| SC | smallint |  |  | → STU, LOC |
| SN | int |  |  | → STU |
| ID | int |  |  |  |
| OID | nvarchar(255) |  |  |  |
| RID | int |  |  |  |
| RTY | nvarchar(50) |  |  |  |
| ST | nvarchar(6) |  |  |  |
| RCO | nvarchar(max) |  |  |  |
| TY | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| PDD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: DAA.SC = STU.SC AND DAA.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: DAA.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **DAM**: DAM.NID = DAA.NID
- **DAU**: DAU.NID = DAA.NID
