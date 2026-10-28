# SRB

Summer Requests Backup

Rows: 0 · Primary key: SSC, SEQ, ID, SQ · Columns: 20

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SSC | smallint |  |  | FK → SBU.SC |
| SEQ | int |  |  | FK → SBU.SEQ |
| ID | int |  |  | → STU |
| TM | varchar(1) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| TG | varchar(1) |  |  |  |
| PF | varchar(1) |  |  |  |
| U1 | varchar(1) |  |  |  |
| U2 | varchar(1) |  |  |  |
| U3 | varchar(1) |  |  |  |
| U4 | varchar(1) |  |  |  |
| U5 | varchar(1) |  |  |  |
| SE | smallint |  |  |  |
| TN | smallint |  |  |  |
| RT | varchar(2) |  |  |  |
| SQ | smallint |  |  |  |
| AC | varchar(6) |  |  |  |
| AT | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SBU**: SRB.SSC = SBU.SC AND SRB.SEQ = SBU.SEQ
- inferred → **STU**: SRB.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: SRB.CN = CRS.CN (course number)
