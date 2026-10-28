# SSC

Summer School Courses

Rows: 100 · Primary key: SSC, TM, CN · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SSC | smallint |  |  | FK → SST.SSC |
| TM | varchar(1) |  |  | FK → SST.TM |
| CN | varchar(6) |  |  | FK → CRS.CN |
| CR | money |  |  |  |
| OL | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: SSC.CN = CRS.CN
- declared FK → **SST**: SSC.SSC = SST.SSC AND SSC.TM = SST.TM
- inferred → **CRS**: SSC.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **SAR**: SAR.SSC = SSC.SSC AND SAR.TM = SSC.TM AND SAR.CN = SSC.CN
- **SSR**: SSR.SSC = SSC.SSC AND SSR.TM = SSC.TM AND SSR.CN = SSC.CN
