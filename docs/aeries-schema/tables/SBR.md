# SBR

Stores a link between Courses (CRS) and Standards (STN)

Rows: 18,798 · Primary key: SD, CN · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SD | varchar(20) |  |  | FK → STN.SD |
| CN | varchar(6) |  |  | FK → CRS.CN |
| RC | bit |  |  |  |
| SRT | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: SBR.CN = CRS.CN
- declared FK → **STN**: SBR.SD = STN.SD
- inferred → **CRS**: SBR.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **TSD**: TSD.PSD = SBR.SD AND TSD.CN = SBR.CN
