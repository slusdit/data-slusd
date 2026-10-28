# NAV


Rows: 0 · Primary key: SC, TYP, CAT, NM · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| TYP | varchar(1) |  |  |  |
| CAT | varchar(255) |  |  |  |
| NM | varchar(255) |  |  |  |
| URL | nvarchar(max) |  |  |  |
| DAC | varchar(15) |  |  |  |
| DAP | varchar(55) |  |  |  |
| MTD | varchar(255) |  |  |  |
| NWN | varchar(1) |  |  |  |
| TCR | varchar(1) |  |  |  |
| DST | varchar(1) |  |  |  |
| SCT | varchar(55) |  |  |  |
| ATT | varchar(55) |  |  |  |
| SSV | varchar(55) |  |  |  |
| HID | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: NAV.SC = LOC.CD (school code)
