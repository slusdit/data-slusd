# NDY


Rows: 0 · Primary key: SC, DY · Columns: 25

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| DY | smallint |  |  |  |
| DT | datetime | yes |  |  |
| HO | varchar(1) |  |  |  |
| MO | smallint |  |  |  |
| AP | smallint |  |  |  |
| EN | smallint |  |  |  |
| BL | varchar(10) |  |  |  |
| AB | varchar(1) |  |  |  |
| ML | bit |  |  |  |
| PD | varchar(1) |  |  |  |
| WC | varchar(2) |  |  |  |
| WM | smallint |  |  |  |
| BS | int |  |  |  |
| PAT | datetime | yes |  |  |
| SAT | datetime | yes |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: NDY.SC = LOC.CD (school code)
