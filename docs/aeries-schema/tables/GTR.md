# GTR

Stores information about each referral to the GATE program that has been made for a student.

Rows: 0 · Primary key: ID, SQ · Columns: 27

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → GTE.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| DR | datetime | yes |  |  |
| ST | varchar(3) |  |  |  |
| RR1 | varchar(3) |  |  |  |
| RR2 | varchar(3) |  |  |  |
| RR3 | varchar(3) |  |  |  |
| RR4 | varchar(3) |  |  |  |
| RR5 | varchar(3) |  |  |  |
| TE | varchar(255) |  |  |  |
| CC | varchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| LSD | datetime | yes |  |  |
| LSS | varchar(1) |  |  |  |
| LRD | datetime | yes |  |  |
| LRS | varchar(2) |  |  |  |
| U1 | varchar(2) |  |  |  |
| U2 | varchar(2) |  |  |  |
| U3 | varchar(2) |  |  |  |
| U4 | varchar(2) |  |  |  |
| U5 | varchar(2) |  |  |  |
| U6 | varchar(2) |  |  |  |
| U7 | varchar(2) |  |  |  |
| U8 | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GTE**: GTR.ID = GTE.ID
- inferred → **STU**: GTR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **GTC**: GTC.ID = GTR.ID AND GTC.RSQ = GTR.SQ
- **GTN**: GTN.ID = GTR.ID AND GTN.RSQ = GTR.SQ
