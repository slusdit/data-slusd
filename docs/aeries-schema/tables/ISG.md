# ISG

Stores Independent Study Agreement signatures for agreements.

Rows: 0 · Primary key: ID, SQ, SQ1 · Columns: 31

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → ISA.ID |
| SQ | smallint |  |  | FK → ISA.SQ |
| SQ1 | smallint |  |  |  |
| AT | nvarchar(6) |  |  |  |
| AID | int |  |  |  |
| NM | nvarchar(50) |  |  |  |
| RL | nvarchar(50) |  |  |  |
| EM | nvarchar(255) |  |  |  |
| AH1 | nvarchar(max) |  |  |  |
| AH2 | nvarchar(max) |  |  |  |
| AH3 | nvarchar(max) |  |  |  |
| ASD | datetime | yes |  |  |
| DSS | nvarchar(max) |  |  |  |
| ST | nvarchar(max) |  |  |  |
| SL | varchar(2) |  |  |  |
| DT | datetime | yes |  |  |
| IP | nvarchar(max) |  |  |  |
| DAA | bit |  |  |  |
| MSD | varbinary(max) | yes |  |  |
| DNM | nvarchar(max) |  |  |  |
| DSZ | int |  |  |  |
| STF | bit |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ISA**: ISG.ID = ISA.ID AND ISG.SQ = ISA.SQ
- inferred → **STU**: ISG.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
