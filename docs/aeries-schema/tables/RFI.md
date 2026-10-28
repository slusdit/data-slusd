# RFI

Stores Referrals for Intervention for each student.

Rows: 201 · Primary key: ID, SQ · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| SID | int |  |  |  |
| CO | nvarchar(max) |  |  |  |
| RNM | varchar(255) |  |  |  |
| RR | varchar(255) |  |  |  |
| ST | varchar(3) |  |  | COD RFI.ST (1 codes) |
| CO1 | nvarchar(max) |  |  |  |
| SCL | smallint |  |  |  |
| DN | datetime | yes |  |  |
| PSQ | smallint |  |  |  |
| TS | bit |  |  |  |
| TL | varchar(2) |  |  |  |
| SD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: RFI.ID = IDN.ID
- inferred → **STU**: RFI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **RFP**: RFP.ID = RFI.ID AND RFP.SQ = RFI.SQ
- **RFR**: RFR.ID = RFI.ID AND RFR.SQ = RFI.SQ
- **RFS**: RFS.ID = RFI.ID AND RFS.SQ = RFI.SQ
