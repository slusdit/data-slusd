# CRP

Contains the courses setup within the course request packets

Rows: 143 · Primary key: SC, CD, CSQ · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → CRD.SC |
| CD | varchar(6) |  |  | FK → CRD.CD |
| CSQ | smallint |  |  |  |
| CN | varchar(6) |  |  | FK → CRS.CN |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRD**: CRP.SC = CRD.SC AND CRP.CD = CRD.CD
- declared FK → **CRS**: CRP.CN = CRS.CN
- inferred → **CRS**: CRP.CN = CRS.CN (course number)
- inferred → **LOC**: CRP.SC = LOC.CD (school code)
