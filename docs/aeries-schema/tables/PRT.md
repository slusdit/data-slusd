# PRT

Provides alignment of printer to output a variety of reports on preprinted forms

Rows: 184 · Primary key: SC, RN · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| RN | varchar(100) |  |  |  |
| LM | smallint |  |  |  |
| TM | smallint |  |  |  |
| BLM | smallint |  |  |  |
| BTM | smallint |  |  |  |
| CC | smallint |  |  |  |
| CS | money |  |  |  |
| RS | money |  |  |  |
| LW | money |  |  |  |
| LH | money |  |  |  |
| AL | varchar(15) |  |  |  |
| FS | smallint |  |  |  |
| FW | varchar(15) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: PRT.SC = LOC.CD (school code)
