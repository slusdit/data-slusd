# DAQ

Aeries Web Only. Stores the qualifying level of each student for each Aeries Analytics Analysis Item

Rows: 9,962,659 · Primary key: ID, SQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| AID | varchar(255) |  |  | FK → DAI.AID |
| D1 | datetime |  |  |  |
| D2 | datetime | yes |  |  |
| SCL | smallint |  |  |  |
| GR | smallint |  |  |  |
| LVL | smallint |  |  |  |
| QV | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DAI**: DAQ.AID = DAI.AID
- declared FK → **IDN**: DAQ.ID = IDN.ID
- inferred → **STU**: DAQ.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
