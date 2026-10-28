# CNF

Counseling conference log (detailed).

Aeries: Contains detail for one of the two Counselor Tables - More details than VIS (both can be used)

Rows: 59,123 · Primary key: PID, SQ · Columns: 26

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| DT | datetime | yes |  |  |
| CD | varchar(2) |  |  | COD CNF.CD (1 codes) |
| CO | nvarchar(max) |  |  |  |
| CU | nvarchar(max) |  |  |  |
| GR | smallint |  |  |  |
| ST | varchar(1) |  |  |  |
| CL | varchar(3) |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| D3 | datetime | yes |  |  |
| SQ | smallint |  |  |  |
| STI | datetime | yes |  |  |
| ETI | datetime | yes |  |  |
| TTI | datetime | yes |  |  |
| TG | varchar(1) |  |  |  |
| SID | int |  |  |  |
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

- declared FK → **IDN**: CNF.PID = IDN.ID
