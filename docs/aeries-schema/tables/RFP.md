# RFP

Stores Prior Interventions for each Referral for Intervention.

Rows: 11 · Primary key: ID, SQ, SQ1 · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → RFI.ID |
| SQ | smallint |  |  | FK → RFI.SQ |
| SQ1 | smallint |  |  |  |
| CD | varchar(3) |  |  | COD RFP.CD (3 codes) |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **RFI**: RFP.ID = RFI.ID AND RFP.SQ = RFI.SQ
- inferred → **STU**: RFP.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
