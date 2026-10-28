# ISP

Stores product work hours for Independent Study agreements.

Rows: 102 · Primary key: ID, SQ · Columns: 23

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | int |  |  |  |
| SE | smallint |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| EMP | int |  |  |  |
| CP | varchar(3) |  |  |  |
| CO | varchar(max) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| TRH | varchar(20) |  |  |  |
| TRD | varchar(20) |  |  |  |
| TXH | money |  |  |  |
| WT | varchar(2) |  |  |  |
| EE | varchar(1) |  |  |  |
| CS | varchar(1) |  |  |  |
| SCS | varchar(1) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ISP.ID = IDN.ID
- inferred → **STU**: ISP.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: ISP.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **IVS**: IVS.ID = ISP.ID AND IVS.SQ = ISP.SQ
