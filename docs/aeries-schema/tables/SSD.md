# SSD

Contains additional Student Data

Rows: 19,970 · Primary key: SC, SN · Columns: 46

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| AD2 | varchar(55) |  |  |  |
| RA2 | varchar(55) |  |  |  |
| MID | varchar(12) |  |  |  |
| SUS | varchar(1) |  |  |  |
| HMT | varchar(3) |  |  | COD SSD.HMT (18 codes) |
| HMO | varchar(20) |  |  |  |
| SPN | varchar(1) |  |  |  |
| VTN | varchar(1) |  |  |  |
| NY | smallint |  |  |  |
| VES | varchar(1) |  |  |  |
| CPE | varchar(1) |  |  |  |
| CEQ | varchar(1) |  |  |  |
| PSP | varchar(1) |  |  | COD SSD.PSP (6 codes) |
| PAP | varchar(1) |  |  |  |
| PAC | varchar(1) |  |  |  |
| PEP | varchar(1) |  |  |  |
| TGC | int |  |  |  |
| TGN | varchar(20) |  |  |  |
| FLC | money |  |  |  |
| RCD | varchar(3) |  |  |  |
| RDB | int |  |  |  |
| RDW | datetime | yes |  |  |
| RSD | datetime | yes |  |  |
| RUW | varchar(255) |  |  |  |
| SVY | varchar(1) |  |  |  |
| ADM | varchar(1) |  |  |  |
| FE | varchar(1) |  |  |  |
| ES | varchar(1) |  |  |  |
| E1 | varchar(1) |  |  |  |
| PSC | varchar(1) |  |  |  |
| IRC | varchar(1) |  |  |  |
| FE1 | varchar(1) |  |  |  |
| MIG | varchar(12) |  |  |  |
| FID | varchar(10) |  |  |  |
| ADG | varchar(3) |  |  |  |
| HT | bit |  |  |  |
| LE | varchar(1) |  |  |  |
| RC | varchar(1) |  |  |  |
| PSS | nvarchar(3) |  |  |  |
| APA | nvarchar(1) |  |  |  |
| TFR | varchar(6) |  |  |  |
| ADE | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STU**: SSD.SC = STU.SC AND SSD.SN = STU.SN
- inferred → **STU**: SSD.SC = STU.SC AND SSD.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: SSD.SC = LOC.CD (school code)

## Used in views

`ELLEVATION_ListStudentDemoData`, `SEIS_Demographic`
