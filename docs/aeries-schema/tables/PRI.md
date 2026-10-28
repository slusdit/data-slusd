# PRI

Stores Pre-Referral Interventions for each student.

Rows: 1,901 · Primary key: ID, SQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| SID | int |  |  |  |
| CO | nvarchar(max) |  |  |  |
| ST | varchar(3) |  |  | COD PRI.ST (1 codes) |
| CO1 | nvarchar(max) |  |  |  |
| PS | smallint |  |  |  |
| CO2 | nvarchar(max) |  |  |  |
| SCL | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: PRI.ID = IDN.ID
- inferred → **STU**: PRI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **PRC**: PRC.ID = PRI.ID AND PRC.SQ = PRI.SQ
- **PRN**: PRN.ID = PRI.ID AND PRN.SQ = PRI.SQ
- **PRR**: PRR.ID = PRI.ID AND PRR.SQ = PRI.SQ
