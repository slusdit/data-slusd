# SLR

Aeries Web Only. Contains detailed information about specific organizations that students are donating their time to.

Rows: 0 · Primary key: ID, SQ · Columns: 23

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → SLD.ID |
| SQ | smallint |  |  |  |
| ORG | varchar(255) |  |  |  |
| AD | varchar(55) |  |  |  |
| CY | varchar(30) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| RF | nvarchar(max) |  |  |  |
| AHR | money |  |  |  |
| PHR | money |  |  |  |
| SNM | varchar(255) |  |  |  |
| STL | varchar(255) |  |  |  |
| SEM | varchar(255) |  |  |  |
| GR | smallint |  |  |  |
| SCL | smallint |  |  |  |
| WS | varchar(255) |  |  |  |
| AO | bit |  |  |  |
| OST | nvarchar(1) |  |  |  |
| OID | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SLD**: SLR.ID = SLD.ID
- inferred → **STU**: SLR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **SLL**: SLL.ID = SLR.ID AND SLL.RSQ = SLR.SQ
