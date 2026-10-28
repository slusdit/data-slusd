# SMB

Exactly like SMS, only stores multiple sets of SMS data based on the number of backups made. Aeries Web only at this time.

Rows: 81,447 · Primary key: SC, SEQ, SE · Columns: 102

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → SBU.SC |
| SEQ | int |  |  | FK → SBU.SEQ |
| SE | smallint |  |  | → MST |
| PD | smallint |  |  |  |
| BL | smallint |  |  |  |
| SM | varchar(1) |  |  |  |
| DY | varchar(6) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| TN | smallint |  |  | → TCH |
| RM | varchar(6) |  |  |  |
| CR | money |  |  |  |
| SX | varchar(1) |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| MX | smallint |  |  |  |
| TS | smallint |  |  |  |
| TB | smallint |  |  |  |
| TG | smallint |  |  |  |
| PS | smallint |  |  |  |
| GP | varchar(1) |  |  |  |
| ST | varchar(1) |  |  |  |
| TR | varchar(1) |  |  |  |
| PR | varchar(3) |  |  |  |
| HP | varchar(2) |  |  |  |
| MM | bit |  |  |  |
| MT | bit |  |  |  |
| MW | bit |  |  |  |
| MR | bit |  |  |  |
| MF | bit |  |  |  |
| MS | bit |  |  |  |
| SCL | smallint |  |  |  |
| TN2 | smallint |  |  |  |
| TN3 | smallint |  |  |  |
| MTS | varchar(2) |  |  |  |
| SG | varchar(2) |  |  |  |
| TM | smallint |  |  |  |
| CG | varchar(2) |  |  |  |
| HQT | varchar(1) |  |  |  |
| HQ2 | varchar(1) |  |  |  |
| HQ3 | varchar(1) |  |  |  |
| STG | varchar(1) |  |  |  |
| ADA | varchar(1) |  |  |  |
| ESR | varchar(1) |  |  |  |
| LI | varchar(2) |  |  |  |
| INS | varchar(3) |  |  |  |
| FS | varchar(3) |  |  |  |
| TEP | varchar(1) |  |  |  |
| U1 | varchar(3) |  |  |  |
| U2 | varchar(3) |  |  |  |
| U3 | varchar(3) |  |  |  |
| U4 | varchar(3) |  |  |  |
| U5 | varchar(3) |  |  |  |
| U6 | varchar(3) |  |  |  |
| U7 | varchar(3) |  |  |  |
| U8 | varchar(3) |  |  |  |
| CID | int |  |  |  |
| ISI | varchar(1) |  |  |  |
| DLI | varchar(1) |  |  |  |
| IT | varchar(1) |  |  |  |
| USA | bit |  |  |  |
| PSV | nvarchar(2) |  |  |  |
| CTY | nvarchar(2) |  |  |  |
| MMN | smallint |  |  |  |
| GN | nvarchar(1) |  |  |  |
| TOG | smallint |  |  |  |
| CT | nvarchar(2) |  |  |  |
| HQP | bit |  |  |  |
| SIT | nvarchar(2) |  |  |  |
| ET | nvarchar(2) |  |  |  |
| EE | nvarchar(2) |  |  |  |
| PKT | nvarchar(2) |  |  |  |
| CSC | nvarchar(20) |  |  |  |
| CNC | nvarchar(1) |  |  |  |
| ACC | nvarchar(4) |  |  |  |
| OIT | nvarchar(1) |  |  |  |
| MSC | nvarchar(1) |  |  |  |
| NCA | nvarchar(4) |  |  |  |
| HQC | nvarchar(1) |  |  |  |
| TP1 | nvarchar(3) |  |  |  |
| TP2 | nvarchar(3) |  |  |  |
| TP3 | nvarchar(3) |  |  |  |
| AR | nvarchar(1) |  |  |  |
| SR1 | nvarchar(3) |  |  |  |
| SR2 | nvarchar(3) |  |  |  |
| SR3 | nvarchar(3) |  |  |  |
| FSQ | int |  |  |  |
| CSQ | int |  |  |  |
| ES | bit |  |  |  |
| AC | nvarchar(1) |  |  |  |
| NCI | nvarchar(2) |  |  |  |
| CH | smallint |  |  |  |
| ETR | varchar(1) |  |  |  |
| PC | bit |  |  |  |
| MSGE | bit |  |  |  |
| AE | bit |  |  |  |
| AU | nvarchar(6) |  |  |  |
| CL | varchar(6) |  |  |  |
| CTM | nvarchar(4) |  |  |  |
| CCO | varchar(8) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| POI | varchar(1) |  |  |  |

## Joins

- declared FK → **SBU**: SMB.SC = SBU.SC AND SMB.SEQ = SBU.SEQ
- inferred → **MST**: SMB.SC = MST.SC AND SMB.SE = MST.SE (section number)
- inferred → **CRS**: SMB.CN = CRS.CN (course number)
- inferred → **TCH**: SMB.SC = TCH.SC AND SMB.TN = TCH.TN (teacher number)
- inferred → **LOC**: SMB.SC = LOC.CD (school code)
