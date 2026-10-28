# WPT

Record of Work Permits issued to Students

Rows: 4,387 · Primary key: PID, SQ · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| EC | int |  |  | FK → EMP.CD |
| AI | int |  |  |  |
| ID | datetime | yes |  | → STU |
| ED | datetime | yes |  |  |
| TY | varchar(3) |  |  | COD WPT.TY (3 codes) |
| MH | money |  |  |  |
| AC | varchar(50) |  |  |  |
| GC | varchar(50) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| MT | smallint |  |  |  |
| MS | smallint |  |  |  |
| FR | smallint |  |  |  |
| SA | smallint |  |  |  |
| SU | smallint |  |  |  |
| MO | money |  |  |  |
| HI | varchar(50) |  |  |  |
| HO | varchar(50) |  |  |  |
| SH | varchar(50) |  |  |  |
| SQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: WPT.PID = IDN.ID
- declared FK → **EMP**: WPT.EC = EMP.CD
- inferred → **STU**: WPT.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **WPV**: WPV.PID = WPT.PID AND WPV.SQ = WPT.SQ
