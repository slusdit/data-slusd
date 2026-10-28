# GTE

Stores main GATE information about a student.

Rows: 1,909 · Primary key: ID · Columns: 26

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| ESD | datetime | yes |  |  |
| EED | datetime | yes |  |  |
| PSD | datetime | yes |  |  |
| PED | datetime | yes |  |  |
| U1 | varchar(2) |  |  |  |
| U2 | varchar(2) |  |  |  |
| U3 | varchar(2) |  |  |  |
| U4 | varchar(2) |  |  |  |
| U5 | varchar(2) |  |  |  |
| U6 | varchar(2) |  |  |  |
| U7 | varchar(2) |  |  |  |
| U8 | varchar(2) |  |  |  |
| CC1 | varchar(3) |  |  |  |
| CC2 | varchar(3) |  |  |  |
| CC3 | varchar(3) |  |  |  |
| CC4 | varchar(3) |  |  |  |
| CC5 | varchar(3) |  |  |  |
| CC6 | varchar(3) |  |  |  |
| PL | varchar(2) |  |  |  |
| DST | varchar(14) |  |  |  |
| IDT | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| HCE | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: GTE.ID = IDN.ID
- inferred → **STU**: GTE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **GTR**: GTR.ID = GTE.ID
- **GTT**: GTT.ID = GTE.ID
