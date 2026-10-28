# CBS

District Attendance Letter Summary

Rows: 0 · Primary key: BID · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| BID | varchar(32) |  |  |  |
| TY | varchar(2) |  |  |  |
| LTO | int |  |  |  |
| CM | nvarchar(100) |  |  |  |
| UN | varchar(255) |  |  |  |
| CDT | datetime | yes |  |  |
| SUN | varchar(255) |  |  |  |
| SDT | datetime | yes |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| ST | varchar(2) |  |  |  |
| STM | nvarchar(max) |  |  |  |
| PRE | varbinary(max) | yes |  |  |
| PRT | varbinary(max) | yes |  |  |
| TOT | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **CBD**: CBD.BID = CBS.BID
