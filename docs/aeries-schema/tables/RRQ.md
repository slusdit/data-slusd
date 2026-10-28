# RRQ

Records Requests

Rows: 0 · Primary key: ID, SQ · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| RDT | datetime | yes |  |  |
| DSN | nvarchar(150) |  |  |  |
| SNM | nvarchar(150) |  |  |  |
| SAD | nvarchar(150) |  |  |  |
| SCY | nvarchar(30) |  |  |  |
| SST | nvarchar(2) |  |  |  |
| SZC | nvarchar(5) |  |  |  |
| STL | nvarchar(10) |  |  |  |
| SFX | nvarchar(10) |  |  |  |
| SCN | nvarchar(50) |  |  |  |
| ST | smallint |  |  |  |
| DIR | smallint |  |  |  |
| CO | nvarchar(max) |  |  |  |
| CDT | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: RRQ.ID = IDN.ID
- inferred → **STU**: RRQ.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **RRI**: RRI.ID = RRQ.ID AND RRI.SQ = RRQ.SQ
