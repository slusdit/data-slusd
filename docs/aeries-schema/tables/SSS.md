# SSS

Scheduling: next-year student schedule requests (planning copy of SEC).

Aeries: Contains Students Schedules for the next semester or year – for planning purposes.

Rows: 27,696 · Primary key: SC, SN, SQ · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC, SMS.SC, TCH.SC |
| SN | int |  |  | FK → STU.SN |
| SE | smallint |  |  | FK → SMS.SE |
| CN | varchar(6) |  |  | FK → CRS.CN |
| TN | smallint |  |  | FK → TCH.TN |
| RT | varchar(2) |  |  |  |
| AC | varchar(6) |  |  |  |
| AT | varchar(1) |  |  |  |
| SQ | smallint |  |  |  |
| PL | varchar(2) |  |  | COD SSS.PL (5 codes) |
| TM | varchar(1) |  |  |  |
| TG | varchar(1) |  |  |  |
| PF | varchar(1) |  |  |  |
| U1 | varchar(1) |  |  |  |
| U2 | varchar(1) |  |  |  |
| U3 | varchar(1) |  |  |  |
| U4 | varchar(1) |  |  |  |
| U5 | varchar(1) |  |  |  |
| PS | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: SSS.CN = CRS.CN
- declared FK → **STU**: SSS.SC = STU.SC AND SSS.SN = STU.SN
- declared FK → **SMS**: SSS.SC = SMS.SC AND SSS.SE = SMS.SE
- declared FK → **TCH**: SSS.SC = TCH.SC AND SSS.TN = TCH.TN
- inferred → **STU**: SSS.SC = STU.SC AND SSS.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: SSS.SC = MST.SC AND SSS.SE = MST.SE (section number)
- inferred → **CRS**: SSS.CN = CRS.CN (course number)
- inferred → **TCH**: SSS.SC = TCH.SC AND SSS.TN = TCH.TN (teacher number)
- inferred → **LOC**: SSS.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **ACA**: ACA.SC = SSS.SC AND ACA.SN = SSS.SN AND ACA.PSQ = SSS.SQ

## Used in views

`SLUSD_ACADEMY_SSS`
