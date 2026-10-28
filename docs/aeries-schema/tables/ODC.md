# ODC

Used to match incoming courses from Records Transfer with local courses.

Rows: 0 · Primary key: CDS, OCN · Columns: 33

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CDS | varchar(50) |  |  |  |
| OCN | varchar(6) |  |  |  |
| OCO | varchar(30) |  |  |  |
| DE | varchar(30) |  |  |  |
| NA | varchar(1) |  |  |  |
| CP | varchar(1) |  |  |  |
| S1 | varchar(255) |  |  |  |
| S2 | varchar(255) |  |  |  |
| S3 | varchar(255) |  |  |  |
| DC | varchar(255) |  |  |  |
| US | varchar(14) |  |  |  |
| PE | bit |  |  |  |
| TA | bit |  |  |  |
| CD | nvarchar(max) |  |  |  |
| CM | nvarchar(max) |  |  |  |
| VCL | varchar(2) |  |  |  |
| CL | varchar(2) |  |  |  |
| TY | varchar(2) |  |  |  |
| NCC | varchar(255) |  |  |  |
| CA1 | varchar(255) |  |  |  |
| CA2 | varchar(255) |  |  |  |
| E1 | varchar(1) |  |  |  |
| CSE | varchar(1) |  |  |  |
| CSH | varchar(1) |  |  |  |
| VL | varchar(2) |  |  |  |
| U1 | varchar(1) |  |  |  |
| U2 | varchar(1) |  |  |  |
| U3 | varchar(1) |  |  |  |
| VLU | varchar(255) |  |  |  |
| C3 | varchar(4) |  |  |  |
| C1 | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **OCM**: OCM.CDS = ODC.CDS AND OCM.OCN = ODC.OCN
