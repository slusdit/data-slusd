# INV

Contains details of Intervention Actions taken

Rows: 68,832 · Primary key: PID, SQ · Columns: 38

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| DT | datetime | yes |  |  |
| CD | varchar(10) |  |  | COD INV.CD (40 codes) |
| DS | varchar(20) |  |  | COD INV.DS (60 codes) |
| DY | smallint |  |  |  |
| HR | money |  |  |  |
| DD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| DM | money |  |  |  |
| TG | varchar(1) |  |  | COD INV.TG (9 codes) |
| CO | nvarchar(max) |  |  |  |
| TN | smallint |  |  |  |
| GR | smallint |  |  |  |
| SQ | smallint |  |  |  |
| RF | varchar(50) |  |  |  |
| SCL | smallint |  |  |  |
| PL | varchar(2) |  |  | COD INV.PL (1 codes) |
| PV | varchar(6) |  |  | COD INV.PV (15 codes) |
| CT | varchar(3) |  |  | COD INV.CT (6 codes) |
| LV | varchar(2) |  |  | COD INV.LV (2 codes) |
| DP | bit |  |  |  |
| RS | varchar(3) |  |  | COD INV.RS (12 codes) |
| NM | varchar(255) |  |  |  |
| TS | bit |  |  |  |
| TL | varchar(2) |  |  |  |
| RSQ | smallint |  |  |  |
| LCN | nvarchar(255) |  |  | COD INV.LCN (1 codes) |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| TCF | varchar(1) |  |  |  |
| SRF | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: INV.PID = IDN.ID

## Referenced by (declared FKs)

- **INC**: INC.PID = INV.PID AND INC.SQ = INV.SQ
- **ING**: ING.PID = INV.PID AND ING.SQ = INV.SQ
- **INM**: INM.PID = INV.PID AND INM.SQ = INV.SQ
- **INP**: INP.PID = INV.PID AND INP.SQ = INV.SQ
- **INR**: INR.PID = INV.PID AND INR.SQ = INV.SQ
- **INS**: INS.PID = INV.PID AND INS.SQ = INV.SQ
- **IPI**: IPI.PID = INV.PID AND IPI.SQ = INV.SQ
- **IRC**: IRC.PID = INV.PID AND IRC.SQ = INV.SQ
- **ISS**: ISS.PID = INV.PID AND ISS.SQ = INV.SQ
