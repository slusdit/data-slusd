# DNT

Contains history of details for Dental testing

Rows: 10,065 · Primary key: PID, SQ · Columns: 28

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| TD | datetime | yes |  |  |
| GR | smallint |  |  |  |
| AG | smallint |  |  |  |
| SCN | varchar(3) |  |  |  |
| DR | varchar(3) |  |  |  |
| DT | datetime | yes |  |  |
| PF | varchar(1) |  |  |  |
| IN | varchar(6) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| VF | varchar(2) |  |  |  |
| VC | varchar(2) |  |  |  |
| TR | varchar(2) |  |  |  |
| WV | varchar(2) |  |  |  |
| FO | varchar(6) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| PND | datetime | yes |  |  |
| OPT | varchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: DNT.PID = IDN.ID
