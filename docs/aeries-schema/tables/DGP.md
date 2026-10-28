# DGP

Stores District Defined GPAs.

Rows: 0 · Primary key: GID · Columns: 51

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GID | int |  |  |  |
| SNM | nvarchar(6) |  |  |  |
| LNM | nvarchar(20) |  |  |  |
| DE | nvarchar(max) |  |  |  |
| CL1 | varchar(2) |  |  |  |
| SN1 | nvarchar(6) |  |  |  |
| LN1 | nvarchar(20) |  |  |  |
| DE1 | nvarchar(max) |  |  |  |
| CL2 | varchar(2) |  |  |  |
| SN2 | nvarchar(6) |  |  |  |
| LN2 | nvarchar(20) |  |  |  |
| DE2 | nvarchar(max) |  |  |  |
| CL3 | varchar(2) |  |  |  |
| SN3 | nvarchar(6) |  |  |  |
| LN3 | nvarchar(20) |  |  |  |
| DE3 | nvarchar(max) |  |  |  |
| CL4 | varchar(2) |  |  |  |
| SN4 | nvarchar(6) |  |  |  |
| LN4 | nvarchar(20) |  |  |  |
| DE4 | nvarchar(max) |  |  |  |
| CL5 | varchar(2) |  |  |  |
| SN5 | nvarchar(6) |  |  |  |
| LN5 | nvarchar(20) |  |  |  |
| DE5 | nvarchar(max) |  |  |  |
| CL6 | varchar(2) |  |  |  |
| SN6 | nvarchar(6) |  |  |  |
| LN6 | nvarchar(20) |  |  |  |
| DE6 | nvarchar(max) |  |  |  |
| CTY | varchar(3) |  |  |  |
| FC | varchar(6) |  |  |  |
| FV | varchar(255) |  |  |  |
| FVC | varchar(2) |  |  |  |
| CW | bit |  |  |  |
| CNW | bit |  |  |  |
| RT | varchar(2) |  |  |  |
| RG | int |  |  |  |
| RCT | money |  |  |  |
| RDT | money |  |  |  |
| OG | varchar(3) |  |  |  |
| TG | varchar(1) |  |  |  |
| ST | bit |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| STG | varchar(255) |  |  |  |
| CU | varchar(1) |  |  |  |
| UCW | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **DGS**: DGS.GID = DGP.GID
- **DGT**: DGT.GID = DGP.GID
- **DGW**: DGW.GID = DGP.GID
- **GPA**: GPA.GID = DGP.GID
