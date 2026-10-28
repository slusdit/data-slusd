# FTS

Aeries Web Only. Contains the current financial transaction summary for each student.

Rows: 3 · Primary key: ID · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| EID | int |  |  |  |
| CID | int |  |  |  |
| RB | money |  |  |  |
| NA | money |  |  |  |
| ND | datetime | yes |  |  |
| CURL | varchar(255) |  |  |  |
| BURL | varchar(255) |  |  |  |
| CTL | money |  |  |  |
| TD | datetime | yes |  |  |
| AB | money |  |  |  |
| AP | money |  |  |  |
| CSU | bit |  |  |  |
| ATP | bit |  |  |  |
| FPS | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FTS.ID = IDN.ID
- inferred → **STU**: FTS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **FTD**: FTD.ID = FTS.ID
