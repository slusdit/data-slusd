# ECA

Stores data to track Extracurricular Activity eligibility and participation

Rows: 0 · Primary key: ID · Columns: 43

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| ED | datetime | yes |  |  |
| LP | datetime | yes |  |  |
| MC | varchar(1) |  |  |  |
| AP | datetime | yes |  |  |
| ASB | varchar(1) |  |  |  |
| ITP | varchar(1) |  |  |  |
| ITS | varchar(1) |  |  |  |
| LC | money |  |  |  |
| LCX | varchar(1) |  |  |  |
| PC | money |  |  |  |
| PCX | varchar(1) |  |  |  |
| LG | money |  |  |  |
| LGX | varchar(1) |  |  |  |
| PG | money |  |  |  |
| PGX | varchar(1) |  |  |  |
| LCP | smallint |  |  |  |
| PCP | smallint |  |  |  |
| LCI | varchar(1) |  |  |  |
| LWH | varchar(1) |  |  |  |
| PCI | varchar(1) |  |  |  |
| PWH | varchar(1) |  |  |  |
| ES | varchar(4) |  |  |  |
| CE | smallint |  |  |  |
| CR | money |  |  |  |
| CRX | varchar(1) |  |  |  |
| PU | bit |  |  |  |
| PUD | datetime | yes |  |  |
| DLL | datetime | yes |  |  |
| DLU | datetime | yes |  |  |
| U1 | varchar(2) |  |  |  |
| U2 | varchar(2) |  |  |  |
| U3 | varchar(2) |  |  |  |
| U4 | varchar(2) |  |  |  |
| U5 | varchar(2) |  |  |  |
| U6 | varchar(2) |  |  |  |
| U7 | varchar(2) |  |  |  |
| U8 | varchar(2) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DI | datetime | yes |  |  |
| RD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ECA.ID = IDN.ID
- inferred → **STU**: ECA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
