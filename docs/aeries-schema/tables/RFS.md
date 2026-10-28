# RFS

Stores Student Strengths for each Referral for Intervention.

Rows: 2 · Primary key: ID, SQ, SQ1 · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → RFI.ID |
| SQ | smallint |  |  | FK → RFI.SQ |
| SQ1 | smallint |  |  |  |
| CD | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **RFI**: RFS.ID = RFI.ID AND RFS.SQ = RFI.SQ
- inferred → **STU**: RFS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
