# EMP

Contains information concerning Employers for Student Work Permits – Can be DISTRICT MANAGED

Rows: 1,348 · Primary key: CD · Columns: 39

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CD | int |  |  |  |
| NM | varchar(50) |  |  |  |
| AD | varchar(55) |  |  |  |
| CY | varchar(30) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| ZX | varchar(4) |  |  |  |
| TL | varchar(10) |  |  |  |
| U1 | varchar(1) |  |  |  |
| U2 | varchar(1) |  |  |  |
| U3 | varchar(1) |  |  |  |
| U4 | varchar(1) |  |  |  |
| U5 | varchar(1) |  |  |  |
| U6 | varchar(1) |  |  |  |
| U7 | varchar(1) |  |  |  |
| U8 | varchar(1) |  |  |  |
| U9 | varchar(1) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| WC | varchar(50) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| CL | varchar(25) |  |  |  |
| CFN | varchar(50) |  |  |  |
| CLN | varchar(50) |  |  |  |
| CPS | varchar(50) |  |  |  |
| FX | varchar(10) |  |  |  |
| EM | varchar(50) |  |  |  |
| YR | varchar(4) |  |  |  |
| TG | varchar(1) |  |  | COD EMP.TG (1 codes) |
| OCD | datetime | yes |  |  |
| CCD | datetime | yes |  |  |
| INS | varchar(50) |  |  |  |
| POS | varchar(50) |  |  |  |
| CNT | varchar(50) |  |  |  |
| XD | datetime | yes |  |  |
| CG | varchar(6) |  |  |  |
| SG | varchar(3) |  |  |  |
| ICT | varchar(3) |  |  | COD EMP.ICT (5 codes) |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **CRS**: EMP.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **WPT**: WPT.EC = EMP.CD
