# APL

Maintains a record of any change done to a student's academic plan.

Rows: 20 · Primary key: PID, SQ · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| GR | smallint |  |  |  |
| TM | varchar(1) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| LC | varchar(6) |  |  |  |
| SD | datetime | yes |  |  |
| ST | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| ICD | varchar(3) |  |  |  |
| ICC | nvarchar(max) |  |  |  |
| IBY | varchar(255) |  |  |  |
| IIP | varchar(255) |  |  |  |
| ISC | smallint |  |  |  |
| DCD | varchar(3) |  |  |  |
| DCC | nvarchar(max) |  |  |  |
| DBY | varchar(255) |  |  |  |
| DIP | varchar(255) |  |  |  |
| DSC | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: APL.PID = IDN.ID
- inferred → **CRS**: APL.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **APC**: APC.PID = APL.PID AND APC.SQ = APL.SQ
