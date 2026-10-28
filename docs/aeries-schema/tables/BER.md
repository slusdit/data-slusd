# BER

Tracks Mechanical Restraint, Physical Restraint, and Seclusion for State Reporting and Civil Rights Data Collection.

Rows: 154 · Primary key: ID, SQ · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| CD | varchar(3) |  |  | COD BER.CD (3 codes) |
| CO | nvarchar(max) |  |  |  |
| SCL | smallint |  |  |  |
| IID | int |  |  |  |
| STY | nvarchar(2) |  |  |  |
| RS | nvarchar(2) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: BER.ID = IDN.ID
- inferred → **STU**: BER.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
