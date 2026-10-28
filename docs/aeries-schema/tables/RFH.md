# RFH


Rows: 0 · Primary key: ID, SQ · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| FID | nvarchar(6) |  |  |  |
| ED | datetime | yes |  |  |
| LD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: RFH.ID = IDN.ID
- inferred → **STU**: RFH.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **RFD**: RFD.ID = RFH.ID AND RFD.SQ = RFH.SQ
