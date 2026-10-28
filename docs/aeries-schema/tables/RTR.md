# RTR

Stores data regarding student records which are being requested by another school district.

Rows: 0 · Primary key: RID · Columns: 24

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | varchar(255) |  |  |  |
| ID | int |  |  | → STU |
| SSID | varchar(255) |  |  |  |
| FN | varchar(255) |  |  |  |
| MN | varchar(255) |  |  |  |
| LN | varchar(255) |  |  |  |
| BD | datetime | yes |  |  |
| SX | varchar(1) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| SD | datetime | yes |  |  |
| CDS | varchar(50) |  |  |  |
| DNM | varchar(255) |  |  |  |
| SNM | varchar(255) |  |  |  |
| CY | varchar(255) |  |  |  |
| ST | varchar(2) |  |  |  |
| EM | varchar(255) |  |  |  |
| NM | varchar(255) |  |  |  |
| PH | varchar(255) |  |  |  |
| RDT | datetime | yes |  |  |
| SDT | datetime | yes |  |  |
| TTS | varchar(255) |  |  |  |
| OD | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: RTR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
