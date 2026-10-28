# ODE

Used to track student enrollment outside of your district

Rows: 58,929 · Primary key: ID, SQ · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| DNM | varchar(255) |  |  |  |
| SNM | varchar(255) |  |  |  |
| AD | varchar(255) |  |  |  |
| CY | varchar(255) |  |  |  |
| ST | varchar(2) |  |  |  |
| CU | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| EG | smallint |  |  |  |
| LG | smallint |  |  |  |
| ED | datetime | yes |  |  |
| LD | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| SQ | smallint |  |  |  |
| CNM | varchar(255) |  |  |  |
| TL | varchar(10) |  |  |  |
| FX | varchar(10) |  |  |  |
| EXP | varchar(1) |  |  |  |
| SPE | varchar(1) |  |  |  |
| FOF | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ODE.ID = IDN.ID
- inferred → **STU**: ODE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
