# DSP

Dispositions (consequences) for discipline incidents; several per ADS row.

Aeries: For recording multiple dispositions for a specific assertive discipline offense

Rows: 145,910 · Primary key: PID, SQ, SQ1 · Columns: 31

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → ADS.PID |
| SQ | smallint |  | ADS sequence number | FK → ADS.SQ |
| SQ1 | smallint |  |  |  |
| DS | varchar(20) |  | Disposition code (COD DSP.DS) | COD DSP.DS (50 codes) |
| DY | money |  | Days |  |
| HR | money |  |  |  |
| DD | datetime | yes | Disposition date |  |
| ED | datetime | yes |  |  |
| AA | varchar(2) |  |  | COD DSP.AA (4 codes) |
| PL | varchar(2) |  |  | COD DSP.PL (13 codes) |
| RS | varchar(3) |  |  | COD DSP.RS (4 codes) |
| RD | datetime | yes |  |  |
| RST | varchar(1) |  |  | COD DSP.RST (4 codes) |
| RL | varchar(3) |  |  |  |
| ST | varchar(1) |  |  |  |
| IDY | money |  |  |  |
| IHR | money |  |  |  |
| IDD | datetime | yes |  |  |
| IED | datetime | yes |  |  |
| IRD | datetime | yes |  |  |
| RDD | varchar(3) |  |  |  |
| SA | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DA | datetime | yes |  |  |
| IC | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ADS**: DSP.PID = ADS.PID AND DSP.SQ = ADS.SQ

## Used in views

`MIISS_suspensions`, `SLUSD_SpED_Suspensions`, `llm_discipline_incidents`, `llm_suspension_summary`
