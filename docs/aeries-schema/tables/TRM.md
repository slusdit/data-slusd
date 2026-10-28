# TRM

Term definitions per school: quarters, semesters and year with start/end dates.

Aeries: Define school terms

Rows: 129 · Primary key: SC, TM · Columns: 60

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code | → LOC |
| TM | varchar(1) |  | Term code: 1-4 = quarters, F = fall semester, S = spring semester, Y = year |  |
| D1 | datetime | yes | Term start date |  |
| D2 | datetime | yes | Term end date |  |
| D1A | datetime | yes | Track A term start (tracked schools only) |  |
| D2A | datetime | yes | Track A term end |  |
| D1B | datetime | yes |  |  |
| D2B | datetime | yes |  |  |
| D1C | datetime | yes |  |  |
| D2C | datetime | yes |  |  |
| D1D | datetime | yes |  |  |
| D2D | datetime | yes |  |  |
| D1E | datetime | yes |  |  |
| D2E | datetime | yes |  |  |
| D1F | datetime | yes |  |  |
| D2F | datetime | yes |  |  |
| H1 | datetime | yes |  |  |
| H2 | datetime | yes |  |  |
| D1G | datetime | yes |  |  |
| D2G | datetime | yes |  |  |
| D1H | datetime | yes |  |  |
| D2H | datetime | yes |  |  |
| D1I | datetime | yes |  |  |
| D2I | datetime | yes |  |  |
| D1J | datetime | yes |  |  |
| D2J | datetime | yes |  |  |
| D1K | datetime | yes |  |  |
| D2K | datetime | yes |  |  |
| D1L | datetime | yes |  |  |
| D2L | datetime | yes |  |  |
| D1M | datetime | yes |  |  |
| D2M | datetime | yes |  |  |
| D1N | datetime | yes |  |  |
| D2N | datetime | yes |  |  |
| D1O | datetime | yes |  |  |
| D2O | datetime | yes |  |  |
| D1P | datetime | yes |  |  |
| D2P | datetime | yes |  |  |
| D1Q | datetime | yes |  |  |
| D2Q | datetime | yes |  |  |
| D1R | datetime | yes |  |  |
| D2R | datetime | yes |  |  |
| D1S | datetime | yes |  |  |
| D2S | datetime | yes |  |  |
| D1T | datetime | yes |  |  |
| D2T | datetime | yes |  |  |
| D1U | datetime | yes |  |  |
| D2U | datetime | yes |  |  |
| D1V | datetime | yes |  |  |
| D2V | datetime | yes |  |  |
| D1W | datetime | yes |  |  |
| D2W | datetime | yes |  |  |
| D1X | datetime | yes |  |  |
| D2X | datetime | yes |  |  |
| D1Y | datetime | yes |  |  |
| D2Y | datetime | yes |  |  |
| D1Z | datetime | yes |  |  |
| D2Z | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: TRM.SC = LOC.CD (school code)

## Used in views

`CLEVER_SECTIONS`, `MIISS_elementary_office_referrals`, `MIISS_elementary_tardy`, `SEIS_Discipline`

## Used in saved reports

"Terms: All Schools", "Terms: Summer Schools"
