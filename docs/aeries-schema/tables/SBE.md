# SBE

Contains the Categories and Standards selected for Elementary report cards – Can be DISTRICT MANAGED

Rows: 2,528 · Primary key: GR, RC, SQ · Columns: 26

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GR | smallint |  |  |  |
| RC | varchar(3) |  |  |  |
| SQ | int |  |  |  |
| SD | varchar(20) |  |  | FK → STN.SD |
| TI | varchar(255) |  |  |  |
| PL | int |  |  |  |
| LI | smallint |  |  |  |
| TI1 | nvarchar(255) |  |  |  |
| CL1 | varchar(2) |  |  |  |
| TI2 | nvarchar(255) |  |  |  |
| CL2 | varchar(2) |  |  |  |
| TI3 | nvarchar(255) |  |  |  |
| CL3 | varchar(2) |  |  |  |
| TI4 | nvarchar(255) |  |  |  |
| CL4 | varchar(2) |  |  |  |
| TI5 | nvarchar(255) |  |  |  |
| CL5 | varchar(2) |  |  |  |
| TI6 | nvarchar(255) |  |  |  |
| CL6 | varchar(2) |  |  |  |
| LV | smallint |  |  |  |
| SRT | int |  |  |  |
| SHD | bit |  |  |  |
| CT | bit |  |  |  |
| BLD | varchar(5) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STN**: SBE.SD = STN.SD
