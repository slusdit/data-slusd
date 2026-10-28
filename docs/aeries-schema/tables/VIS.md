# VIS

Counseling visit log (simple).

Aeries: Contains detail for one of the two Counselor Tables - Less detail than CNF (both can be used)

Rows: 322 · Primary key: PID, SQ · Columns: 25

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| DT | datetime | yes |  |  |
| CD | varchar(2) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| SQ | smallint |  |  |  |
| CU | nvarchar(max) |  |  |  |
| GR | smallint |  |  |  |
| ST | varchar(1) |  |  |  |
| CL | varchar(3) |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| D3 | datetime | yes |  |  |
| STI | datetime | yes |  |  |
| ETI | datetime | yes |  |  |
| TTI | datetime | yes |  |  |
| TG | varchar(1) |  |  |  |
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

- declared FK → **IDN**: VIS.PID = IDN.ID
