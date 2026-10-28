# STN

Contains all possible Categories and Standards that can be printed on a report card

Rows: 4,813 · Primary key: SD · Columns: 74

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SD | varchar(20) |  |  |  |
| TI | nvarchar(255) |  |  |  |
| TY | varchar(1) |  |  | COD STN.TY (4 codes) |
| CA | varchar(20) |  |  |  |
| MT1 | varchar(2) |  |  |  |
| MT2 | varchar(1) |  |  |  |
| MT3 | varchar(1) |  |  |  |
| MT4 | varchar(1) |  |  |  |
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
| TG | varchar(1) |  |  |  |
| LS | smallint |  |  |  |
| GR0 | bit |  |  |  |
| GR1 | bit |  |  |  |
| GR2 | bit |  |  |  |
| GR3 | bit |  |  |  |
| GR4 | bit |  |  |  |
| GR5 | bit |  |  |  |
| GR6 | bit |  |  |  |
| GR7 | bit |  |  |  |
| GR8 | bit |  |  |  |
| MM | varchar(1) |  |  |  |
| IN1 | bit |  |  |  |
| IN2 | bit |  |  |  |
| AT1 | bit |  |  |  |
| AT2 | bit |  |  |  |
| AT3 | bit |  |  |  |
| AT4 | bit |  |  |  |
| AT5 | bit |  |  |  |
| AT6 | bit |  |  |  |
| AT7 | bit |  |  |  |
| AT8 | bit |  |  |  |
| AT9 | bit |  |  |  |
| AT10 | bit |  |  |  |
| AT11 | bit |  |  |  |
| AT12 | bit |  |  |  |
| BID | nvarchar(255) |  |  |  |
| TS | nvarchar(2) |  |  |  |
| ST | nvarchar(255) |  |  |  |
| SQ | int |  |  |  |
| GR9 | bit |  |  |  |
| GR10 | bit |  |  |  |
| GR11 | bit |  |  |  |
| GR12 | bit |  |  |  |
| DE | nvarchar(max) |  |  |  |
| GRN1 | bit |  |  |  |
| GRN2 | bit |  |  |  |
| NL | bit |  |  |  |
| RID | int |  |  |  |
| ATI1 | bit |  |  |  |
| MT11 | varchar(2) |  |  |  |
| MT12 | varchar(2) |  |  |  |
| MT13 | varchar(2) |  |  |  |
| MT14 | varchar(2) |  |  |  |
| MT15 | varchar(2) |  |  |  |
| MT16 | varchar(2) |  |  |  |
| MT17 | varchar(2) |  |  |  |
| MT18 | varchar(2) |  |  |  |
| MT19 | varchar(2) |  |  |  |
| MT110 | varchar(2) |  |  |  |
| MT111 | varchar(2) |  |  |  |
| MT112 | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **SBE**: SBE.SD = STN.SD
- **SBG**: SBG.SD = STN.SD
- **SBH**: SBH.SD = STN.SD
- **SBR**: SBR.SD = STN.SD
- **SBD**: SBD.SD = STN.SD
