# PST

Defines the Payment Schedules available for Billing

Rows: 0 · Primary key: SC, ID · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| ID | varchar(3) |  |  | → STU |
| NM | varchar(50) |  |  |  |
| DE | varchar(255) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DM | smallint |  |  |  |
| DW | varchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: PST.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: PST.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **BIL**: BIL.SC = PST.SC AND BIL.PST = PST.ID
- **PSD**: PSD.SC = PST.SC AND PSD.ID = PST.ID
