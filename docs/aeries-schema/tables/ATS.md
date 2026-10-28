# ATS

Contains details of Supplemental Attendance Sessions offered

Rows: 106 · Primary key: SC, SE · Columns: 36

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → MST, TCH, LOC |
| SE | int |  |  | → MST |
| NM | nvarchar(255) |  |  |  |
| PR | varchar(6) |  |  | FK → ATP.PR |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| TM | smallint |  |  |  |
| RM | varchar(4) |  |  |  |
| SX | varchar(1) |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| TR | varchar(1) |  |  |  |
| SCL | smallint |  |  |  |
| MX | smallint |  |  |  |
| UC1 | varchar(3) |  |  |  |
| UC2 | varchar(3) |  |  |  |
| UC3 | varchar(3) |  |  |  |
| UC4 | varchar(3) |  |  |  |
| UC5 | varchar(3) |  |  |  |
| UC6 | varchar(3) |  |  |  |
| UC7 | varchar(3) |  |  |  |
| UC8 | varchar(3) |  |  |  |
| NT | nvarchar(max) |  |  |  |
| TG | varchar(1) |  |  |  |
| CID | smallint |  |  |  |
| MSE | smallint |  |  |  |
| TN | smallint |  |  | → TCH |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| CG | bit |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| PD | varchar(1) |  |  |  |
| GN | nvarchar(1) |  |  |  |
| FSQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ATP**: ATS.PR = ATP.PR
- inferred → **MST**: ATS.SC = MST.SC AND ATS.SE = MST.SE (section number)
- inferred → **CRS**: ATS.CN = CRS.CN (course number)
- inferred → **TCH**: ATS.SC = TCH.SC AND ATS.TN = TCH.TN (teacher number)
- inferred → **LOC**: ATS.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **ATA**: ATA.SCL = ATS.SC AND ATA.SE = ATS.SE
- **ATC**: ATC.SC = ATS.SC AND ATC.SE = ATS.SE
- **ATD**: ATD.SCL = ATS.SC AND ATD.SE = ATS.SE
- **ATR**: ATR.SC = ATS.SC AND ATR.SE = ATS.SE
