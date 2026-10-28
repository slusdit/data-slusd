# SSB

Exactly like SSS, only stores multiple sets of SSS data based on the number of backups made. Aeries Web only at this time.

Rows: 324,287 · Primary key: SC, SEQ, SN, SQ · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → SBU.SC |
| SEQ | int |  |  | FK → SBU.SEQ |
| SN | int |  |  | → STU |
| SE | smallint |  |  | → MST |
| CN | varchar(6) |  |  | → CRS |
| TN | smallint |  |  | → TCH |
| RT | varchar(2) |  |  |  |
| AC | varchar(6) |  |  |  |
| AT | varchar(1) |  |  |  |
| SQ | smallint |  |  |  |
| PL | varchar(2) |  |  |  |
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

- declared FK → **SBU**: SSB.SC = SBU.SC AND SSB.SEQ = SBU.SEQ
- inferred → **STU**: SSB.SC = STU.SC AND SSB.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **MST**: SSB.SC = MST.SC AND SSB.SE = MST.SE (section number)
- inferred → **CRS**: SSB.CN = CRS.CN (course number)
- inferred → **TCH**: SSB.SC = TCH.SC AND SSB.TN = TCH.TN (teacher number)
- inferred → **LOC**: SSB.SC = LOC.CD (school code)
