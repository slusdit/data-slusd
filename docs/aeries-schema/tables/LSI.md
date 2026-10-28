# LSI

Contains student legal name and gender data

Rows: 35 · Primary key: ID · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| LLN | nvarchar(100) |  |  |  |
| LFN | nvarchar(100) |  |  |  |
| LMN | nvarchar(100) |  |  |  |
| GN | varchar(1) |  |  |  |
| LSF | nvarchar(10) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: LSI.ID = IDN.ID
- inferred → **STU**: LSI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
