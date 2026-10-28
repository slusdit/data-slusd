# SBD

Stores Standards-Based Template Details.

Rows: 2,928 · Primary key: ID, SD, SRT, LST · Columns: 28

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → SBS.ID |
| SD | varchar(20) |  |  | FK → STN.SD |
| CA | varchar(20) |  |  |  |
| TI | nvarchar(255) |  |  |  |
| CL1 | varchar(2) |  |  |  |
| TI1 | nvarchar(255) |  |  |  |
| CL2 | varchar(2) |  |  |  |
| TI2 | nvarchar(255) |  |  |  |
| CL3 | varchar(2) |  |  |  |
| TI3 | nvarchar(255) |  |  |  |
| CL4 | varchar(2) |  |  |  |
| TI4 | nvarchar(255) |  |  |  |
| CL5 | varchar(2) |  |  |  |
| TI5 | nvarchar(255) |  |  |  |
| CL6 | varchar(2) |  |  |  |
| TI6 | nvarchar(255) |  |  |  |
| PL | tinyint |  |  |  |
| LI | tinyint |  |  |  |
| CT | bit |  |  |  |
| CH | bit |  |  |  |
| SHD | bit |  |  |  |
| LV | tinyint |  |  |  |
| SRT | smallint |  |  |  |
| LST | varchar(50) |  |  |  |
| BLD | varchar(5) |  |  |  |
| PR | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SBS**: SBD.ID = SBS.ID
- declared FK → **STN**: SBD.SD = STN.SD
- inferred → **STU**: SBD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
