# DAI

Aeries Web Only. Stores Analysis Indicator Definitions for Aeries Analytics

Rows: 212 · Primary key: AID · Columns: 27

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| AID | varchar(255) |  |  |  |
| TI | varchar(255) |  |  |  |
| STI | varchar(10) |  |  |  |
| EWI | bit |  |  |  |
| DLE | datetime | yes |  |  |
| TY | varchar(255) |  |  |  |
| TID | varchar(8) |  |  |  |
| TPT | smallint |  |  |  |
| DTO | smallint |  |  |  |
| TMY | varchar(4) |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| TA | varchar(6) |  |  |  |
| TSF | varchar(255) |  |  |  |
| LVL | varchar(3) |  |  |  |
| GS | varchar(6) |  |  |  |
| GM | varchar(3) |  |  |  |
| C1 | varchar(3) |  |  |  |
| C2 | varchar(3) |  |  |  |
| C3 | varchar(3) |  |  |  |
| OI | varchar(255) |  |  |  |
| SYS | varchar(20) |  |  |  |
| QTI | varchar(20) |  |  |  |
| DF1 | nvarchar(255) |  |  |  |
| DF2 | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **DAG**: DAG.AID = DAI.AID
- **DAQ**: DAQ.AID = DAI.AID
- **DAS**: DAS.AID = DAI.AID
- **DAT**: DAT.AID = DAI.AID
- **SGA**: SGA.AID = DAI.AID
