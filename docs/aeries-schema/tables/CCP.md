# CCP

Stores Career Pathways specific to each Course.

Rows: 72 · Primary key: SC, CN, CD · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| CN | varchar(6) |  |  | FK → CRS.CN |
| CD | varchar(3) |  |  |  |
| LVL | varchar(1) |  |  |  |
| YR | smallint |  |  |  |
| CO | nvarchar(max) |  |  |  |
| RQ | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: CCP.CN = CRS.CN
- inferred → **CRS**: CCP.CN = CRS.CN (course number)
- inferred → **LOC**: CCP.SC = LOC.CD (school code)
