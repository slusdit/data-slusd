# VSN

Contains history of details of Vision Tests

Rows: 43,881 · Primary key: PID, SQ · Columns: 33

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| TD | datetime | yes |  |  |
| GR | smallint |  |  |  |
| RG | varchar(5) |  |  |  |
| LG | varchar(5) |  |  |  |
| BG | varchar(5) |  |  |  |
| RN | varchar(5) |  |  |  |
| LN | varchar(5) |  |  |  |
| BN | varchar(5) |  |  |  |
| CT | varchar(3) |  |  |  |
| MU | varchar(3) |  |  |  |
| SCN | varchar(3) |  |  |  |
| FO | varchar(6) |  |  |  |
| DR | varchar(3) |  |  |  |
| DT | datetime | yes |  |  |
| PF | varchar(1) |  |  |  |
| RGF | varchar(5) |  |  |  |
| LGF | varchar(5) |  |  |  |
| BGF | varchar(5) |  |  |  |
| RNF | varchar(5) |  |  |  |
| LNF | varchar(5) |  |  |  |
| BNF | varchar(5) |  |  |  |
| MUF | varchar(3) |  |  |  |
| IN | varchar(6) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| SQ | smallint |  |  |  |
| SCL | smallint |  |  |  |
| VA | varchar(1) |  |  |  |
| WV | varchar(2) |  |  |  |
| LER | varchar(3) |  |  |  |
| RER | varchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: VSN.PID = IDN.ID
