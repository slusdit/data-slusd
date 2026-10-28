# FRE_HIST


Rows: 189 · Primary key: (none declared) · Columns: 39

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| SQ | smallint |  |  |  |
| FS | varchar(15) |  |  |  |
| AF | varchar(12) |  |  |  |
| FC | varchar(1) |  |  |  |
| NO | smallint |  |  |  |
| YR | money |  |  |  |
| MO | money |  |  |  |
| WK | money |  |  |  |
| NM | varchar(30) |  |  |  |
| SS | varchar(10) |  |  |  |
| DT | datetime | yes |  |  |
| CD | varchar(1) |  |  |  |
| UC | varchar(3) |  |  |  |
| EC | varchar(1) |  |  |  |
| MD | datetime | yes |  |  |
| DR | datetime | yes |  |  |
| DP | bit |  |  |  |
| ESD | datetime | yes |  |  |
| EED | datetime | yes |  |  |
| PSD | datetime | yes |  |  |
| PED | datetime | yes |  |  |
| MSD | datetime | yes |  |  |
| MXD | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| U2 | varchar(3) |  |  |  |
| U3 | varchar(3) |  |  |  |
| U4 | varchar(3) |  |  |  |
| U5 | varchar(3) |  |  |  |
| U6 | varchar(3) |  |  |  |
| U7 | varchar(3) |  |  |  |
| U8 | varchar(3) |  |  |  |
| SCL | smallint |  |  |  |
| SRC | varchar(3) |  |  |  |
| PIR | smallint |  |  |  |
| PDT | datetime | yes |  |  |
| CTR | nvarchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: FRE_HIST.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
