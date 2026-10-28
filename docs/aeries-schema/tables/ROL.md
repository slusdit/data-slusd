# ROL

Aeries Web Only. Stores settings used by the New Year Rollover process

Rows: 52 · Primary key: SC · Columns: 60

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| CDRA | bit |  |  |  |
| CTBC | bit |  |  |  |
| BREQ | bit |  |  |  |
| BSTR | bit |  |  |  |
| LGBB | bit |  |  |  |
| STFL | bit |  |  |  |
| SMST | bit |  |  |  |
| SSFL | bit |  |  |  |
| SMED | bit |  |  |  |
| SATN | bit |  |  |  |
| BGR | bit |  |  |  |
| GR14 | bit |  |  |  |
| GR15 | bit |  |  |  |
| GR16 | bit |  |  |  |
| GR17 | bit |  |  |  |
| U25 | bit |  |  |  |
| KLKR | bit |  |  |  |
| KCU | bit |  |  |  |
| BCU | bit |  |  |  |
| BRS | bit |  |  |  |
| BITD | bit |  |  |  |
| BTR | bit |  |  |  |
| BPR | bit |  |  |  |
| BGC | bit |  |  |  |
| OOF | bit |  |  |  |
| AED | datetime | yes |  |  |
| SSM | bit |  |  |  |
| SED | bit |  |  |  |
| NSD | bit |  |  |  |
| ED | datetime | yes |  |  |
| ISC | smallint |  |  |  |
| ITG | varchar(1) |  |  |  |
| DNR | bit |  |  |  |
| ORP | bit |  |  |  |
| SIP | bit |  |  |  |
| UWA | smallint |  |  |  |
| CCS | bit |  |  |  |
| PDT | datetime | yes |  |  |
| RDT | datetime | yes |  |  |
| CO | varchar(max) |  |  |  |
| SDA | datetime | yes |  |  |
| BSY | bit |  |  |  |
| SFRE | bit |  |  |  |
| USG | bit |  |  |  |
| CGS | bit |  |  |  |
| CPE | bit |  |  |  |
| SQS | bit |  |  |  |
| RCL | bit |  |  |  |
| AP | bit |  |  |  |
| APD | datetime | yes |  |  |
| APB | varchar(255) |  |  |  |
| SSEC | bit |  |  |  |
| PED | datetime | yes |  |  |
| PSD | datetime | yes |  |  |
| PCC | nvarchar(max) |  |  |  |
| IEB | bit |  |  |  |
| KNA | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: ROL.SC = LOC.CD (school code)
