# RTO

Stores data regarding student records which were requested from another school district.

Rows: 0 · Primary key: RID · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | varchar(255) |  |  |  |
| ID | int |  |  | → STU |
| SCL | int |  |  |  |
| CDS | varchar(50) |  |  |  |
| DNM | varchar(255) |  |  |  |
| SNM | varchar(255) |  |  |  |
| CY | varchar(255) |  |  |  |
| ST | varchar(2) |  |  |  |
| RDT | datetime | yes |  |  |
| SDT | datetime | yes |  |  |
| TTS | varchar(255) |  |  |  |
| OD | nvarchar(max) |  |  |  |
| ED | datetime | yes |  |  |
| LD | datetime | yes |  |  |
| SSID | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: RTO.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
