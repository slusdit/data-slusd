# ANC

Stores Attendance Notification Configuration.

Rows: 7 · Primary key: NID · Columns: 23

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| NID | int |  |  |  |
| TI | nvarchar(255) |  |  |  |
| TY | nvarchar(255) |  |  |  |
| ST | datetime | yes |  |  |
| NA | smallint |  |  |  |
| MA | smallint |  |  |  |
| DS | bit |  |  |  |
| NT | nvarchar(max) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| MON | bit |  |  |  |
| TUE | bit |  |  |  |
| WED | bit |  |  |  |
| THU | bit |  |  |  |
| FRI | bit |  |  |  |
| SAT | bit |  |  |  |
| SUN | bit |  |  |  |
| RN | bit |  |  |  |
| DL | datetime | yes |  |  |
| ST2 | datetime | yes |  |  |
| RT | nvarchar(20) |  |  |  |
| ST3 | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **ANA**: ANA.NID = ANC.NID
- **ANL**: ANL.NID = ANC.NID
- **ANS**: ANS.NID = ANC.NID
