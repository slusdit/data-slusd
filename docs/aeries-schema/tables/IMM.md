# IMM

Immunization history.

Aeries: Contains history of Immunizations for Student

Rows: 32,041 · Primary key: PID · Columns: 206

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| BP | varchar(25) |  |  |  |
| P1 | datetime | yes |  |  |
| P2 | datetime | yes |  |  |
| P3 | datetime | yes |  |  |
| P4 | datetime | yes |  |  |
| P5 | datetime | yes |  |  |
| PC | nvarchar(max) |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| D3 | datetime | yes |  |  |
| D4 | datetime | yes |  |  |
| D5 | datetime | yes |  |  |
| DC | nvarchar(max) |  |  |  |
| A1 | datetime | yes |  |  |
| A2 | datetime | yes |  |  |
| MC | nvarchar(max) |  |  |  |
| R1 | datetime | yes |  |  |
| R2 | datetime | yes |  |  |
| RC | nvarchar(max) |  |  |  |
| U1 | datetime | yes |  |  |
| U2 | datetime | yes |  |  |
| UC | nvarchar(max) |  |  |  |
| H1 | datetime | yes |  |  |
| HC | nvarchar(max) |  |  |  |
| T1 | datetime | yes |  |  |
| M1 | varchar(2) |  |  |  |
| B1 | varchar(1) |  |  |  |
| N1 | varchar(1) |  |  |  |
| T2 | datetime | yes |  |  |
| M2 | varchar(2) |  |  |  |
| B2 | varchar(1) |  |  |  |
| N2 | varchar(1) |  |  |  |
| TC | nvarchar(max) |  |  |  |
| XD | datetime | yes |  |  |
| XN | varchar(1) |  |  |  |
| XA | varchar(1) |  |  |  |
| XC | nvarchar(max) |  |  |  |
| RP | varchar(25) |  |  |  |
| SD | datetime | yes |  |  |
| S1 | varchar(1) |  |  |  |
| SE | datetime | yes |  |  |
| S2 | varchar(1) |  |  |  |
| E1 | varchar(1) |  |  |  |
| E2 | varchar(1) |  |  |  |
| E3 | varchar(1) |  |  |  |
| A3 | datetime | yes |  |  |
| I1 | datetime | yes |  |  |
| I2 | datetime | yes |  |  |
| I3 | datetime | yes |  |  |
| T3 | datetime | yes |  |  |
| T4 | datetime | yes |  |  |
| V1 | datetime | yes |  |  |
| V2 | datetime | yes |  |  |
| V3 | datetime | yes |  |  |
| VC | nvarchar(max) |  |  |  |
| Y1 | datetime | yes |  |  |
| Y2 | datetime | yes |  |  |
| Y3 | datetime | yes |  |  |
| YC | nvarchar(max) |  |  |  |
| AC | nvarchar(max) |  |  |  |
| IC | nvarchar(max) |  |  |  |
| Y4 | datetime | yes |  |  |
| DB | datetime | yes |  |  |
| HA1 | datetime | yes |  |  |
| HA2 | datetime | yes |  |  |
| HAC | nvarchar(max) |  |  |  |
| RPT | smallint |  |  |  |
| VD | varchar(1) |  |  |  |
| O1T | varchar(40) |  |  | COD IMM.O1T (4 codes) |
| O11 | datetime | yes |  |  |
| O12 | datetime | yes |  |  |
| O13 | datetime | yes |  |  |
| O14 | datetime | yes |  |  |
| O15 | datetime | yes |  |  |
| O2T | varchar(40) |  |  |  |
| O21 | datetime | yes |  |  |
| O22 | datetime | yes |  |  |
| O23 | datetime | yes |  |  |
| O24 | datetime | yes |  |  |
| O25 | datetime | yes |  |  |
| PE | varchar(1) |  |  | COD IMM.PE (2 codes) |
| PED | datetime | yes |  |  |
| DE | varchar(1) |  |  |  |
| DED | datetime | yes |  |  |
| AE | varchar(1) |  |  |  |
| AED | datetime | yes |  |  |
| YE | varchar(1) |  |  |  |
| YED | datetime | yes |  |  |
| IE | varchar(1) |  |  |  |
| IED | datetime | yes |  |  |
| HAE | varchar(1) |  |  |  |
| HAD | datetime | yes |  |  |
| VE | varchar(1) |  |  |  |
| VED | datetime | yes |  |  |
| HW | varchar(1) |  |  |  |
| TT1 | varchar(1) |  |  | COD IMM.TT1 (3 codes) |
| TT2 | varchar(1) |  |  |  |
| BIC | varchar(14) |  |  |  |
| O3T | varchar(40) |  |  |  |
| O31 | datetime | yes |  |  |
| O32 | datetime | yes |  |  |
| O33 | datetime | yes |  |  |
| O34 | datetime | yes |  |  |
| O35 | datetime | yes |  |  |
| O4T | varchar(40) |  |  |  |
| O41 | datetime | yes |  |  |
| O42 | datetime | yes |  |  |
| O43 | datetime | yes |  |  |
| O44 | datetime | yes |  |  |
| O45 | datetime | yes |  |  |
| DSI | varchar(255) |  |  |  |
| O5T | varchar(40) |  |  |  |
| O51 | datetime | yes |  |  |
| O52 | datetime | yes |  |  |
| O53 | datetime | yes |  |  |
| O54 | datetime | yes |  |  |
| O55 | datetime | yes |  |  |
| O6T | varchar(40) |  |  |  |
| O61 | datetime | yes |  |  |
| O62 | datetime | yes |  |  |
| O63 | datetime | yes |  |  |
| O64 | datetime | yes |  |  |
| O65 | datetime | yes |  |  |
| O7T | varchar(40) |  |  |  |
| O71 | datetime | yes |  |  |
| O72 | datetime | yes |  |  |
| O73 | datetime | yes |  |  |
| O74 | datetime | yes |  |  |
| O75 | datetime | yes |  |  |
| O8T | varchar(40) |  |  |  |
| O81 | datetime | yes |  |  |
| O82 | datetime | yes |  |  |
| O83 | datetime | yes |  |  |
| O84 | datetime | yes |  |  |
| O85 | datetime | yes |  |  |
| O9T | varchar(40) |  |  |  |
| O91 | datetime | yes |  |  |
| O92 | datetime | yes |  |  |
| O93 | datetime | yes |  |  |
| O94 | datetime | yes |  |  |
| O95 | datetime | yes |  |  |
| TB | datetime | yes |  |  |
| TE | varchar(1) |  |  |  |
| TED | datetime | yes |  |  |
| DTT | varchar(50) |  |  |  |
| HED | datetime | yes |  |  |
| TBE | varchar(1) |  |  |  |
| TBD | datetime | yes |  |  |
| I4 | datetime | yes |  |  |
| MC1 | datetime | yes |  |  |
| MCE | varchar(1) |  |  |  |
| MCD | datetime | yes |  |  |
| MCC | nvarchar(max) |  |  |  |
| MC2 | datetime | yes |  |  |
| RPP | nvarchar(25) |  |  |  |
| RPK | nvarchar(25) |  |  |  |
| RP7 | nvarchar(25) |  |  |  |
| RTP | nvarchar(3) |  |  |  |
| RTK | nvarchar(3) |  |  |  |
| RT7 | nvarchar(3) |  |  |  |
| SIP | nvarchar(6) |  |  |  |
| SIK | nvarchar(6) |  |  |  |
| SI7 | nvarchar(6) |  |  |  |
| RMP | nvarchar(3) |  |  | COD IMM.RMP (3 codes) |
| RMK | nvarchar(3) |  |  | COD IMM.RMK (5 codes) |
| RM7 | nvarchar(3) |  |  | COD IMM.RM7 (4 codes) |
| RDP | datetime | yes |  |  |
| RDK | datetime | yes |  |  |
| RD7 | datetime | yes |  |  |
| RFP | nvarchar(3) |  |  | COD IMM.RFP (3 codes) |
| RFK | nvarchar(3) |  |  | COD IMM.RFK (3 codes) |
| RF7 | nvarchar(3) |  |  | COD IMM.RF7 (3 codes) |
| FDP | datetime | yes |  |  |
| FDK | datetime | yes |  |  |
| FD7 | datetime | yes |  |  |
| PC1 | datetime | yes |  |  |
| PC2 | datetime | yes |  |  |
| PC3 | datetime | yes |  |  |
| PC4 | datetime | yes |  |  |
| PCE | varchar(1) |  |  |  |
| PCD | datetime | yes |  |  |
| PCC | nvarchar(max) |  |  |  |
| CV1T | varchar(6) |  |  |  |
| CV1 | datetime | yes |  |  |
| CV2T | varchar(6) |  |  |  |
| CV2 | datetime | yes |  |  |
| CVE | varchar(1) |  |  |  |
| CVD | datetime | yes |  |  |
| CVC | nvarchar(max) |  |  |  |
| PXD | datetime | yes |  |  |
| DXD | datetime | yes |  |  |
| AXD | datetime | yes |  |  |
| IXD | datetime | yes |  |  |
| VXD | datetime | yes |  |  |
| YXD | datetime | yes |  |  |
| HAXD | datetime | yes |  |  |
| HEXD | datetime | yes |  |  |
| PCXD | datetime | yes |  |  |
| MCXD | datetime | yes |  |  |
| TXD | datetime | yes |  |  |
| CVXD | datetime | yes |  |  |
| TBXD | datetime | yes |  |  |
| TEC | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: IMM.PID = IDN.ID
