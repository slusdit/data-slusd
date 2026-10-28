# CHI

Names / Addresses of Districts & Schools outside the current district used by various drop-downs, such as Transcripts

Rows: 1,380 · Primary key: SCH · Columns: 27

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SCH | int |  |  |  |
| NM | varchar(255) |  |  |  |
| TY | varchar(1) |  |  | COD CHI.TY (9 codes) |
| ID | varchar(14) |  |  | → STU |
| AD | varchar(55) |  |  |  |
| CY | varchar(30) |  |  |  |
| ST | varchar(2) |  |  |  |
| CU | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| CNM | varchar(50) |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| TL | varchar(10) |  |  |  |
| FX | varchar(10) |  |  |  |
| U1 | varchar(3) |  |  |  |
| U2 | varchar(3) |  |  |  |
| U3 | varchar(3) |  |  |  |
| U4 | varchar(3) |  |  |  |
| U5 | varchar(3) |  |  |  |
| U6 | varchar(3) |  |  |  |
| U7 | varchar(3) |  |  |  |
| U8 | varchar(3) |  |  |  |
| ZX | varchar(5) |  |  |  |
| PCF | bit |  |  |  |
| TG | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: CHI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **HIS**: HIS.ST = CHI.SCH
