# SBU

Key to each backup table (i.e. backup title, date, sequence). Aeries Web only at this time.

Rows: 290 · Primary key: SC, SEQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| SEQ | int |  |  |  |
| DT | datetime | yes |  |  |
| DE | nvarchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| TS | int |  |  |  |
| CR | int |  |  |  |
| RJ | int |  |  |  |
| TBL | varchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: SBU.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **BAA**: BAA.SC = SBU.SC AND BAA.SEQ = SBU.SEQ
- **BAC**: BAC.SC = SBU.SC AND BAC.SEQ = SBU.SEQ
- **BSA**: BSA.SSC = SBU.SC AND BSA.SEQ = SBU.SEQ
- **BWL**: BWL.SCL = SBU.SC AND BWL.SEQ = SBU.SEQ
- **SAB**: SAB.SSC = SBU.SC AND SAB.SEQ = SBU.SEQ
- **SMB**: SMB.SC = SBU.SC AND SMB.SEQ = SBU.SEQ
- **SRB**: SRB.SSC = SBU.SC AND SRB.SEQ = SBU.SEQ
- **SSB**: SSB.SC = SBU.SC AND SSB.SEQ = SBU.SEQ
- **SSU**: SSU.SC = SBU.SC AND SSU.SEQ = SBU.SEQ
