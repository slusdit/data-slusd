# RT_CHI

Records transfer holding table. Stores a copy of incoming CHI data before it's imported.

Rows: 0 · Primary key: ID · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| LO | smallint |  |  |  |
| NM | varchar(255) |  |  |  |
| TY | varchar(1) |  |  |  |
| ID | varchar(14) |  |  | → STU |
| AD | varchar(55) |  |  |  |
| CY | varchar(30) |  |  |  |
| ST | varchar(2) |  |  |  |
| CU | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| CNM | varchar(50) |  |  |  |
| HI | smallint |  |  |  |
| TL | varchar(10) |  |  |  |
| FX | varchar(10) |  |  |  |
| ZX | varchar(5) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: RT_CHI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
