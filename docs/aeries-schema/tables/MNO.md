# MNO

Contains confidential medical data regarding a student that is usually entered by nurses

Rows: 9,550 · Primary key: PID, SQ · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| GR | smallint |  |  |  |
| AG | smallint |  |  |  |
| DT | datetime | yes |  |  |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| IN | varchar(6) |  |  |  |
| SCL | smallint |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| CD | nvarchar(6) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: MNO.PID = IDN.ID
