# MED

Health office visit log.

Aeries: Contains records of daily visits to the medical office

Rows: 1,959 · Primary key: PID, SQ · Columns: 24

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| CD | varchar(3) |  |  | COD MED.CD (48 codes) |
| DT | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| TG | varchar(1) |  |  |  |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| BC | varchar(6) |  |  |  |
| IN | varchar(6) |  |  |  |
| BU | money |  |  |  |
| RE | varchar(2) |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
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

- declared FK → **IDN**: MED.PID = IDN.ID
