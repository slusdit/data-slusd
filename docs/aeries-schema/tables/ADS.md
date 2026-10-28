# ADS

Discipline incidents (assertive discipline), one row per incident per student.

Aeries: Contains data for one of the two Discipline Tables – More details than DIS (both can be used)

Rows: 120,473 · Primary key: PID, SQ · Columns: 77

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  | Student identifier | FK → IDN.ID |
| DT | datetime | yes | Incident date |  |
| CD | varchar(2) |  | Offense code (COD ADS.CD) | COD ADS.CD (95 codes) |
| DS | varchar(20) |  | Primary disposition | COD ADS.DS (40 codes) |
| DY | smallint |  |  |  |
| HR | money |  |  |  |
| DD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DM | money |  |  |  |
| TG | varchar(1) |  |  | COD ADS.TG (5 codes) |
| CO | nvarchar(max) |  | Incident comment |  |
| TN | smallint |  |  |  |
| SQ | smallint |  | Sequence number (links DSP) |  |
| RF | varchar(50) |  |  |  |
| CD2 | varchar(2) |  | Secondary code 1 |  |
| CD3 | varchar(2) |  | Secondary code 2 |  |
| CD4 | varchar(2) |  | Secondary code 3 |  |
| CD5 | varchar(2) |  | Secondary code 4 |  |
| ST | varchar(1) |  |  |  |
| PL | varchar(2) |  |  | COD ADS.PL (13 codes) |
| RST | varchar(1) |  |  | COD ADS.RST (4 codes) |
| RD | datetime | yes |  |  |
| RS | varchar(3) |  |  | COD ADS.RS (3 codes) |
| SCL | smallint |  | Incident school code |  |
| INI | varchar(6) |  |  |  |
| LCN | varchar(6) |  |  | COD ADS.LCN (21 codes) |
| ET | datetime | yes |  |  |
| AXT | varchar(3) |  |  |  |
| WT | varchar(3) |  |  | COD ADS.WT (5 codes) |
| DS2 | varchar(20) |  |  |  |
| DS3 | varchar(20) |  |  |  |
| GR | smallint |  |  |  |
| PIN | varchar(12) |  |  |  |
| ND1 | datetime | yes |  |  |
| ND2 | datetime | yes |  |  |
| ND3 | datetime | yes |  |  |
| ND4 | datetime | yes |  |  |
| NY1 | varchar(2) |  |  |  |
| NY2 | varchar(2) |  |  |  |
| NY3 | varchar(2) |  |  |  |
| NY4 | varchar(2) |  |  |  |
| RL | varchar(3) |  |  |  |
| FDD | datetime | yes |  |  |
| SXD | datetime | yes |  |  |
| LNF | varchar(1) |  |  |  |
| SSE | varchar(1) |  |  |  |
| SHD | datetime | yes |  |  |
| U1 | varchar(2) |  |  |  |
| U2 | varchar(2) |  |  |  |
| U3 | varchar(2) |  |  |  |
| U4 | varchar(2) |  |  |  |
| U5 | varchar(2) |  |  |  |
| U6 | varchar(2) |  |  |  |
| U7 | varchar(2) |  |  |  |
| U8 | varchar(2) |  |  |  |
| CO2 | nvarchar(max) |  |  |  |
| AA | varchar(2) |  |  | COD ADS.AA (4 codes) |
| ISI | varchar(1) |  |  |  |
| IID | int |  |  |  |
| S54 | varchar(1) |  |  |  |
| PM | varchar(3) |  |  | COD ADS.PM (4 codes) |
| SR | bit |  |  |  |
| PI1 | varchar(3) |  |  |  |
| PI2 | varchar(3) |  |  |  |
| PI3 | varchar(3) |  |  |  |
| RR | varchar(1) |  |  |  |
| DE | varchar(50) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| SRF | int |  |  |  |
| SSP | varchar(1) |  |  |  |
| SDT | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ADS.PID = IDN.ID

## Referenced by (declared FKs)

- **DSP**: DSP.PID = ADS.PID AND DSP.SQ = ADS.SQ
- **EXP**: EXP.PID = ADS.PID AND EXP.SQ = ADS.SQ

## Used in views

`MIISS_elementary_office_referrals`, `MIISS_suspensions`, `SLUSD_SpED_Suspensions`, `llm_discipline_incidents`, `llm_suspension_summary`
