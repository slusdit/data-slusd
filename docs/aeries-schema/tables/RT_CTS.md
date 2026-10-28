# RT_CTS

Records transfer holding table. Stores a copy of incoming CTS data before it's imported.

Rows: 0 · Primary key: RequestID, PID, DT, NM, ST1 · Columns: 40

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RequestID | varchar(255) |  |  |  |
| Imported | bit |  |  |  |
| Duplicate | bit |  |  |  |
| PID | int |  |  |  |
| DT | datetime |  |  |  |
| NM | varchar(20) |  |  |  |
| ST1 | varchar(6) |  |  |  |
| SC1 | float |  |  |  |
| ST2 | varchar(6) |  |  |  |
| SC2 | float |  |  |  |
| ST3 | varchar(6) |  |  |  |
| SC3 | float |  |  |  |
| ST4 | varchar(6) |  |  |  |
| SC4 | float |  |  |  |
| ST5 | varchar(6) |  |  |  |
| SC5 | float |  |  |  |
| TTL | float |  |  |  |
| SCL | smallint |  |  |  |
| ST6 | varchar(6) |  |  |  |
| SC6 | float |  |  |  |
| ST7 | varchar(6) |  |  |  |
| SC7 | float |  |  |  |
| ST8 | varchar(6) |  |  |  |
| SC8 | float |  |  |  |
| ST9 | varchar(6) |  |  |  |
| SC9 | float |  |  |  |
| ST10 | varchar(6) |  |  |  |
| SC10 | float |  |  |  |
| ST11 | varchar(6) |  |  |  |
| SC11 | float |  |  |  |
| ST12 | varchar(6) |  |  |  |
| SC12 | float |  |  |  |
| ST13 | varchar(6) |  |  |  |
| SC13 | float |  |  |  |
| SRC | varchar(3) |  |  |  |
| TY | varchar(3) |  |  |  |
| BE | varchar(1) |  |  |  |
| BM | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
