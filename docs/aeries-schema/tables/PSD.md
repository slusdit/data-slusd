# PSD

Contains Payment Schedules for Billing

Rows: 0 · Primary key: SC, ID, PN · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → PST.SC |
| ID | varchar(3) |  |  | FK → PST.ID |
| PN | smallint |  |  |  |
| DT | datetime |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **PST**: PSD.SC = PST.SC AND PSD.ID = PST.ID
- inferred → **STU**: PSD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: PSD.SC = LOC.CD (school code)
