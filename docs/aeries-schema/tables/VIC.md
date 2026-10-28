# VIC

Store information for Victims of harassment or any other offenses

Rows: 16 · Primary key: PID, SQ · Columns: 28

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| GR | smallint |  |  |  |
| B1 | varchar(3) |  |  |  |
| B2 | varchar(3) |  |  |  |
| B3 | varchar(3) |  |  |  |
| B4 | varchar(3) |  |  |  |
| TY | varchar(2) |  |  | COD VIC.TY (4 codes) |
| IID | int |  |  |  |
| SCL | smallint |  |  |  |
| LCN | varchar(6) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| ST | varchar(3) |  |  | COD VIC.ST (3 codes) |
| BS | bit |  |  |  |
| BR | bit |  |  |  |
| BD | bit |  |  |  |
| BB | bit |  |  |  |
| BO | bit |  |  |  |
| BG | bit |  |  |  |
| RT | varchar(2) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: VIC.PID = IDN.ID
