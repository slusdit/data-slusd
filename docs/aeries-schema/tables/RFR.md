# RFR

Stores Reasons and Concerns for each Referral for Intervention.

Rows: 75 · Primary key: ID, SQ, SQ1 · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → RFI.ID |
| SQ | smallint |  |  | FK → RFI.SQ |
| SQ1 | smallint |  |  |  |
| CD | varchar(3) |  |  | COD RFR.CD (3 codes) |
| CO | nvarchar(max) |  |  | COD RFR.CO (1 codes) |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **RFI**: RFR.ID = RFI.ID AND RFR.SQ = RFI.SQ
- inferred → **STU**: RFR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
