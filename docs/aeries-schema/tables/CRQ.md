# CRQ

Contains the list of courses offered to students in different grade levels during scheduling

Rows: 0 · Primary key: SC, GR, SA, CN · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| GR | smallint |  |  |  |
| SA | varchar(6) |  |  |  |
| CN | varchar(6) |  |  | FK → CRS.CN |
| CO | varchar(30) |  |  |  |
| TS | smallint |  |  |  |
| TG | varchar(1) |  |  |  |
| SQ | smallint |  |  |  |
| PT | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: CRQ.CN = CRS.CN
- inferred → **CRS**: CRQ.CN = CRS.CN (course number)
- inferred → **LOC**: CRQ.SC = LOC.CD (school code)
