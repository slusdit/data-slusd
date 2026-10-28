# TSD

Stores teacher defined standards by class.

Rows: 0 · Primary key: SD · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SD | varchar(20) |  |  |  |
| SID | int |  |  | FK → STF.ID |
| CN | varchar(6) |  |  | FK → SBR.CN |
| PSD | varchar(20) |  |  | FK → SBR.SD |
| TI | nvarchar(max) |  |  |  |
| STI | varchar(20) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SBR**: TSD.PSD = SBR.SD AND TSD.CN = SBR.CN
- declared FK → **STF**: TSD.SID = STF.ID
- inferred → **CRS**: TSD.CN = CRS.CN (course number)
