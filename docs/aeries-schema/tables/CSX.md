# CSX

Special Ed Secondary Transition data - reported by TX districts for SPPI-13 dataset in the SPEDS summer submission.

Rows: 0 · Primary key: ID, AMD · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| AMD | datetime |  |  |  |
| IRD | datetime | yes |  |  |
| MSD | varchar(4) |  |  |  |
| USD | varchar(4) |  |  |  |
| TA | varchar(4) |  |  |  |
| ITS | varchar(4) |  |  |  |
| CSG | varchar(4) |  |  |  |
| CTN | varchar(4) |  |  |  |
| CAS | varchar(4) |  |  |  |
| CAR | varchar(4) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: CSX.ID = IDN.ID
- inferred → **STU**: CSX.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
