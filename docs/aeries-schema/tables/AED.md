# AED

Stores Adult Education data

Rows: 0 · Primary key: ID · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| YSC | int |  |  |  |
| MYO | varchar(1) |  |  |  |
| HDE | varchar(4) |  |  |  |
| DEO | varchar(1) |  |  |  |
| CS | varchar(1) |  |  |  |
| ST | varchar(4) |  |  |  |
| RE | varchar(6) |  |  |  |
| PP | varchar(5) |  |  |  |
| ED | datetime | yes |  |  |
| PG | varchar(4) |  |  |  |
| SG | varchar(4) |  |  |  |
| AIT | varchar(1) |  |  |  |
| UD | datetime | yes |  |  |
| LF | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: AED.ID = IDN.ID
- inferred → **STU**: AED.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **AEF**: AEF.ID = AED.ID
