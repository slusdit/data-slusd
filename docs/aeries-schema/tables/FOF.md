# FOF

Contains the details of each 504 plan.

Rows: 752 · Primary key: ID, SQ · Columns: 25

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| RD | datetime | yes |  |  |
| DE | nvarchar(max) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| UUI | int |  |  |  |
| MT | nvarchar(6) |  |  | COD FOF.MT (3 codes) |
| RF | nvarchar(255) |  |  |  |
| CM | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUN | varchar(255) |  |  |  |
| CN | varchar(1) |  |  | → CRS |
| CND | datetime | yes |  |  |
| AU | varchar(1) |  |  |  |
| AUD | datetime | yes |  |  |
| PR | varchar(1) |  |  |  |
| PRD | datetime | yes |  |  |
| TD | varchar(6) |  |  | COD FOF.TD (5 codes) |
| MD | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: FOF.ID = IDN.ID
- inferred → **STU**: FOF.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: FOF.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **FAP**: FAP.ID = FOF.ID AND FAP.SQ = FOF.SQ
- **FDE**: FDE.ID = FOF.ID AND FDE.SQ = FOF.SQ
- **FEC**: FEC.ID = FOF.ID AND FEC.SQ = FOF.SQ
- **FPP**: FPP.ID = FOF.ID AND FPP.SQ = FOF.SQ
- **FSD**: FSD.ID = FOF.ID AND FSD.SQ = FOF.SQ
