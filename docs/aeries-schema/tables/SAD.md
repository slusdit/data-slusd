# SAD

Contains Performance Indicators against which student success is measured

Rows: 0 · Primary key: SC, KY · Columns: 51

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| KY | smallint |  |  |  |
| PI | varchar(30) |  |  |  |
| CD | smallint |  |  |  |
| TI | varchar(8) |  |  |  |
| TD | varchar(4) |  |  |  |
| TP | smallint |  |  |  |
| TS | varchar(2) |  |  |  |
| TL | smallint |  |  |  |
| TH | smallint |  |  |  |
| GB | varchar(8) |  |  |  |
| GM | varchar(8) |  |  |  |
| GA | varchar(8) |  |  |  |
| GS | varchar(1) |  |  |  |
| GE | varchar(3) |  |  |  |
| DT | datetime | yes |  |  |
| BS | smallint |  |  |  |
| MS | smallint |  |  |  |
| AS | smallint |  |  |  |
| ND | smallint |  |  |  |
| FBS | smallint |  |  |  |
| FAS | smallint |  |  |  |
| GBX | varchar(8) |  |  |  |
| GAX | varchar(8) |  |  |  |
| BTL | smallint |  |  |  |
| BTH | smallint |  |  |  |
| ATL | smallint |  |  |  |
| ATH | smallint |  |  |  |
| BXL | smallint |  |  |  |
| BXH | smallint |  |  |  |
| AXL | smallint |  |  |  |
| AXH | smallint |  |  |  |
| C1 | varchar(2) |  |  |  |
| C2 | varchar(2) |  |  |  |
| C3 | varchar(2) |  |  |  |
| TA | varchar(6) |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| OD | smallint |  |  |  |
| IBS | smallint |  |  |  |
| IMS | smallint |  |  |  |
| IAS | smallint |  |  |  |
| IND | smallint |  |  |  |
| IFBS | smallint |  |  |  |
| IFAS | smallint |  |  |  |
| S2 | varchar(1) |  |  |  |
| S3 | varchar(1) |  |  |  |
| LO | smallint |  |  |  |
| GD | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: SAD.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **SAG**: SAG.SC = SAD.SC AND SAG.KY = SAD.KY
- **SAP**: SAP.SC = SAD.SC AND SAP.KY = SAD.KY
