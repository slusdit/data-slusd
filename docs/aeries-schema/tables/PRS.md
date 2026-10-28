# PRS

Stores parent responses to survey items.

Rows: 10,763 · Primary key: ID, TY, SQ · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| TY | smallint |  |  |  |
| SQ | smallint |  |  |  |
| CD | varchar(3) |  |  |  |
| DT | datetime | yes |  |  |
| ST | varchar(3) |  |  |  |
| IP | varchar(255) |  |  |  |
| AID | int |  |  |  |
| UN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| UY | varchar(1) |  |  |  |
| SRC | varchar(10) |  |  |  |
| SEM | varchar(255) |  |  |  |

## Joins

- declared FK → **IDN**: PRS.ID = IDN.ID
- inferred → **STU**: PRS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **PRD**: PRD.ID = PRS.ID AND PRD.TY = PRS.TY AND PRD.SQ = PRS.SQ
