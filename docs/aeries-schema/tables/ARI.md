# ARI

Stores Student At-Risk Indicators

Rows: 0 · Primary key: ID, SQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| IID | int |  |  | FK → ARC.UID |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| SCY | nvarchar(9) |  |  |  |
| ST | nvarchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ARC**: ARI.IID = ARC.UID
- declared FK → **IDN**: ARI.ID = IDN.ID
- inferred → **STU**: ARI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
