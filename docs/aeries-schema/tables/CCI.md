# CCI

College and Career Indicator

Rows: 7,074 · Primary key: ID · Columns: 50

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| GRS | nvarchar(6) |  |  |  |
| GRN | nvarchar(max) |  |  |  |
| AGS | nvarchar(6) |  |  |  |
| AGN | nvarchar(max) |  |  |  |
| CTS | nvarchar(6) |  |  |  |
| CTN | nvarchar(max) |  |  |  |
| D1S | nvarchar(6) |  |  |  |
| D2S | nvarchar(6) |  |  |  |
| DUN | nvarchar(max) |  |  |  |
| S1S | nvarchar(6) |  |  |  |
| S2S | nvarchar(6) |  |  |  |
| S3S | nvarchar(6) |  |  |  |
| STN | nvarchar(max) |  |  |  |
| A1S | nvarchar(6) |  |  |  |
| A2S | nvarchar(6) |  |  |  |
| ATN | nvarchar(max) |  |  |  |
| MAS | nvarchar(6) |  |  |  |
| MBS | nvarchar(6) |  |  |  |
| MCS | nvarchar(6) |  |  |  |
| MDS | nvarchar(6) |  |  |  |
| MES | nvarchar(6) |  |  |  |
| ST | nvarchar(6) |  |  |  |
| MFS | nvarchar(6) |  |  |  |
| MGS | nvarchar(6) |  |  |  |
| BLS | nvarchar(6) |  |  |  |
| BLN | nvarchar(max) |  |  |  |
| MSS | nvarchar(6) |  |  |  |
| MSN | nvarchar(max) |  |  |  |
| S4S | nvarchar(6) |  |  |  |
| CCS | varchar(6) |  |  |  |
| MHS | varchar(6) |  |  |  |
| MIS | varchar(6) |  |  |  |
| MJS | varchar(6) |  |  |  |
| MKS | varchar(6) |  |  |  |
| I1S | varchar(6) |  |  |  |
| I2S | varchar(6) |  |  |  |
| IBN | varchar(max) |  |  |  |
| APS | varchar(6) |  |  |  |
| APN | varchar(max) |  |  |  |
| JS | varchar(6) |  |  |  |
| JN | varchar(max) |  |  |  |
| WBS | varchar(6) |  |  |  |
| WBN | varchar(max) |  |  |  |
| CES | varchar(6) |  |  |  |
| CEN | varchar(max) |  |  |  |
| COS | varchar(6) |  |  |  |
| CAS | varchar(6) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: CCI.ID = IDN.ID
- inferred → **STU**: CCI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
