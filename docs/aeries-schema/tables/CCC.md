# CCC

College Course Credit

Rows: 18 · Primary key: SC, ID, CN, FSY, LSY · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| ID | smallint |  |  | FK → COL.ID |
| CN | varchar(6) |  |  | FK → CRS.CN |
| FSY | smallint |  |  |  |
| LSY | smallint |  |  |  |
| CCO | varchar(255) |  |  |  |
| CCN | varchar(30) |  |  |  |
| RCC | money |  |  |  |
| RPT | money |  |  |  |
| FGO | bit |  |  |  |
| CCR | money |  |  |  |
| LCR | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **COL**: CCC.ID = COL.ID
- declared FK → **CRS**: CCC.CN = CRS.CN
- inferred → **STU**: CCC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: CCC.CN = CRS.CN (course number)
- inferred → **LOC**: CCC.SC = LOC.CD (school code)
