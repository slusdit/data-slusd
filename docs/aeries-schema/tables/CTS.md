# CTS

Test Scores to be included on College Transcripts

Rows: 12,483 · Primary key: PID, DT, NM, ST1 · Columns: 43

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| DT | datetime |  |  |  |
| NM | varchar(20) |  |  | COD CTS.NM (5 codes) |
| ST1 | varchar(4) |  |  | COD CTS.ST1 (110 codes) |
| SC1 | float |  |  |  |
| ST2 | varchar(4) |  |  | COD CTS.ST2 (1 codes) |
| SC2 | float |  |  |  |
| ST3 | varchar(4) |  |  | COD CTS.ST3 (1 codes) |
| SC3 | float |  |  |  |
| ST4 | varchar(4) |  |  | COD CTS.ST4 (1 codes) |
| SC4 | float |  |  |  |
| ST5 | varchar(4) |  |  | COD CTS.ST5 (1 codes) |
| SC5 | float |  |  |  |
| TTL | float |  |  |  |
| SCL | smallint |  |  |  |
| ST6 | varchar(4) |  |  |  |
| SC6 | float |  |  |  |
| ST7 | varchar(4) |  |  |  |
| SC7 | float |  |  |  |
| ST8 | varchar(4) |  |  |  |
| SC8 | float |  |  |  |
| ST9 | varchar(4) |  |  |  |
| SC9 | float |  |  |  |
| ST10 | varchar(4) |  |  |  |
| SC10 | float |  |  |  |
| ST11 | varchar(4) |  |  |  |
| SC11 | float |  |  |  |
| ST12 | varchar(4) |  |  |  |
| SC12 | float |  |  |  |
| ST13 | varchar(4) |  |  |  |
| SC13 | float |  |  |  |
| SRC | varchar(3) |  |  |  |
| TY | varchar(3) |  |  |  |
| BE | varchar(1) |  |  |  |
| BM | varchar(1) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| TGR | varchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: CTS.PID = IDN.ID

## Used in views

`SLUSD_CSSB_ELA_WL_PROFICIENCY`
