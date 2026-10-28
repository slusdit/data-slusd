# XRF

Tool for District to match criteria required by Testing Pre-IDs and location of data in AERIES

Rows: 2,540 · Primary key: SC, SQ · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| TC | varchar(25) |  |  |  |
| FC | varchar(20) |  |  |  |
| CD | nvarchar(255) |  |  |  |
| DE | varchar(max) |  |  |  |
| HD | bit |  |  |  |
| TC1 | varchar(4) |  |  |  |
| FC1 | varchar(20) |  |  |  |
| SI | varchar(2) |  |  |  |
| CD1 | varchar(255) |  |  |  |
| DE1 | varchar(max) |  |  |  |
| SQ | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: XRF.SC = LOC.CD (school code)
