# CSQ

Academic Plan - Course Sequences

Rows: 0 · Primary key: SQ, SC · Columns: 57

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SQ | int |  |  |  |
| SC | int |  |  | → LOC |
| TI | varchar(255) |  |  |  |
| DE | varchar(max) |  |  |  |
| SA | varchar(6) |  |  |  |
| GR | int |  |  |  |
| CN1 | varchar(6) |  |  |  |
| CN2 | varchar(6) |  |  |  |
| CN3 | varchar(6) |  |  |  |
| CN4 | varchar(6) |  |  |  |
| CN5 | varchar(6) |  |  |  |
| CN6 | varchar(6) |  |  |  |
| PT | varchar(1) |  |  |  |
| CN7 | varchar(6) |  |  |  |
| CN8 | varchar(6) |  |  |  |
| CN9 | varchar(6) |  |  |  |
| CN10 | varchar(6) |  |  |  |
| CN11 | varchar(6) |  |  |  |
| CN12 | varchar(6) |  |  |  |
| CN13 | varchar(6) |  |  |  |
| CN14 | varchar(6) |  |  |  |
| CN15 | varchar(6) |  |  |  |
| CN16 | varchar(6) |  |  |  |
| DT1 | varchar(1) |  |  |  |
| DT2 | varchar(1) |  |  |  |
| DT3 | varchar(1) |  |  |  |
| DT4 | varchar(1) |  |  |  |
| DT5 | varchar(1) |  |  |  |
| DT6 | varchar(1) |  |  |  |
| DT7 | varchar(1) |  |  |  |
| DT8 | varchar(1) |  |  |  |
| DT9 | varchar(1) |  |  |  |
| DT10 | varchar(1) |  |  |  |
| DT11 | varchar(1) |  |  |  |
| DT12 | varchar(1) |  |  |  |
| DT13 | varchar(1) |  |  |  |
| DT14 | varchar(1) |  |  |  |
| DT15 | varchar(1) |  |  |  |
| DT16 | varchar(1) |  |  |  |
| YR1 | smallint |  |  |  |
| YR2 | smallint |  |  |  |
| YR3 | smallint |  |  |  |
| YR4 | smallint |  |  |  |
| YR5 | smallint |  |  |  |
| YR6 | smallint |  |  |  |
| YR7 | smallint |  |  |  |
| YR8 | smallint |  |  |  |
| YR9 | smallint |  |  |  |
| YR10 | smallint |  |  |  |
| YR11 | smallint |  |  |  |
| YR12 | smallint |  |  |  |
| YR13 | smallint |  |  |  |
| YR14 | smallint |  |  |  |
| YR15 | smallint |  |  |  |
| YR16 | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: CSQ.SC = LOC.CD (school code)
