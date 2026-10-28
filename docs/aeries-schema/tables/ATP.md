# ATP

Contains details of Supplemental Attendance Programs offered

Rows: 45 · Primary key: PR · Columns: 26

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PR | varchar(6) |  |  |  |
| NM | nvarchar(255) |  |  |  |
| TY | varchar(3) |  |  | COD ATP.TY (6 codes) |
| MX | smallint |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| UC1 | varchar(3) |  |  |  |
| UC2 | varchar(3) |  |  |  |
| UC3 | varchar(3) |  |  |  |
| UC4 | varchar(3) |  |  |  |
| UC5 | varchar(3) |  |  |  |
| UC6 | varchar(3) |  |  |  |
| UC7 | varchar(3) |  |  |  |
| UC8 | varchar(3) |  |  |  |
| AW | bit |  |  |  |
| CET | bit |  |  |  |
| TG | varchar(1) |  |  |  |
| NT | nvarchar(max) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| RST | bit |  |  |  |
| SSI | bit |  |  |  |
| FA | nvarchar(1) |  |  |  |
| ESY | nvarchar(6) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **ATS**: ATS.PR = ATP.PR
