# IDN

District-wide student identity record, one row per Permanent ID.

Aeries: Contains Permanent ID and other basic student information

Rows: 49,886 · Primary key: ID · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  | Permanent ID (STU.ID) |  |
| LN | nvarchar(100) |  | Last name |  |
| FN | nvarchar(100) |  | First name |  |
| MN | nvarchar(100) |  |  |  |
| SF | nvarchar(10) |  |  |  |
| BD | datetime | yes | Birth date |  |
| SX | varchar(1) |  |  |  |
| CID | varchar(10) |  |  |  |
| GN | nvarchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **ACT**: ACT.PID = IDN.ID
- **ADH**: ADH.ID = IDN.ID
- **ADS**: ADS.PID = IDN.ID
- **AED**: AED.ID = IDN.ID
- **AHD**: AHD.ID = IDN.ID
- **AHS**: AHS.ID = IDN.ID
- **AINV**: AINV.ID = IDN.ID
- **ANL**: ANL.ID = IDN.ID
- **APL**: APL.PID = IDN.ID
- **ARB**: ARB.ID = IDN.ID
- **ARD**: ARD.ID = IDN.ID
- **ARH**: ARH.ID = IDN.ID
- **ARI**: ARI.ID = IDN.ID
- **ARR**: ARR.ID = IDN.ID
- **ARS**: ARS.ID = IDN.ID
- **ATA**: ATA.ID = IDN.ID
- **ATD**: ATD.ID = IDN.ID
- **AUT**: AUT.PID = IDN.ID
- **AWL**: AWL.ID = IDN.ID
- **BER**: BER.ID = IDN.ID
- **BGV**: BGV.ID = IDN.ID
- **CAT**: CAT.ID = IDN.ID
- **CCI**: CCI.ID = IDN.ID
- **CER**: CER.ID = IDN.ID
- **CHD**: CHD.ID = IDN.ID
- **CINV**: CINV.ID = IDN.ID
- **CNF**: CNF.PID = IDN.ID
- **CON**: CON.PID = IDN.ID
- **CPW**: CPW.ID = IDN.ID
- **CRT**: CRT.PID = IDN.ID
- **CRUB**: CRUB.ID = IDN.ID
- **CSE**: CSE.ID = IDN.ID
- **CST**: CST.PID = IDN.ID
- **CSX**: CSX.ID = IDN.ID
- **CTE**: CTE.ID = IDN.ID
- **CTI**: CTI.ID = IDN.ID
- **CTS**: CTS.PID = IDN.ID
- **DAQ**: DAQ.ID = IDN.ID
- **DDS**: DDS.ID = IDN.ID
- **DGV**: DGV.ID = IDN.ID
- **DIS**: DIS.PID = IDN.ID
- **DLH**: DLH.ID = IDN.ID
- **DNT**: DNT.PID = IDN.ID
- **DOC**: DOC.ID = IDN.ID
- **DSD**: DSD.ID = IDN.ID
- **ECA**: ECA.ID = IDN.ID
- **ECD**: ECD.ID = IDN.ID
- **ECO**: ECO.ID = IDN.ID
- **ECP**: ECP.ID = IDN.ID
- **ENR**: ENR.ID = IDN.ID
- **ERL**: ERL.ID = IDN.ID
- **FEE**: FEE.PID = IDN.ID
- **FLG**: FLG.PID = IDN.ID
- **FOF**: FOF.ID = IDN.ID
- **FPS**: FPS.ID = IDN.ID
- **FRE**: FRE.ID = IDN.ID
- **FSA**: FSA.ID = IDN.ID
- **FSC**: FSC.ID = IDN.ID
- **FSE**: FSE.ID = IDN.ID
- **FSH**: FSH.ID = IDN.ID
- **FSI**: FSI.ID = IDN.ID
- **FSL**: FSL.ID = IDN.ID
- **FSM**: FSM.ID = IDN.ID
- **FSN**: FSN.ID = IDN.ID
- **FSP**: FSP.ID = IDN.ID
- **FSR**: FSR.ID = IDN.ID
- **FSS**: FSS.ID = IDN.ID
- **FST**: FST.ID = IDN.ID
- **FTS**: FTS.ID = IDN.ID
- **GES**: GES.ID = IDN.ID
- **GPA**: GPA.ID = IDN.ID
- **GRG**: GRG.PID = IDN.ID
- **GTE**: GTE.ID = IDN.ID
- **HAM**: HAM.ID = IDN.ID
- **HIS**: HIS.PID = IDN.ID
- **HRN**: HRN.PID = IDN.ID
- **HSE**: HSE.PID = IDN.ID
- **HSG**: HSG.ID = IDN.ID
- **HWO**: HWO.PID = IDN.ID
- **IMB**: IMB.ID = IDN.ID
- **IMM**: IMM.PID = IDN.ID
- **INV**: INV.PID = IDN.ID
- **ISA**: ISA.ID = IDN.ID
- **ISP**: ISP.ID = IDN.ID
- **LAA**: LAA.ID = IDN.ID
- **LAC**: LAC.ID = IDN.ID
- **LAV**: LAV.ID = IDN.ID
- **LGD**: LGD.ID = IDN.ID
- **LSI**: LSI.ID = IDN.ID
- **LTL**: LTL.PID = IDN.ID
- **MED**: MED.PID = IDN.ID
- **MHS**: MHS.PID = IDN.ID
- **MII**: MII.PID = IDN.ID
- **MLM**: MLM.PID = IDN.ID
- **MLS**: MLS.ID = IDN.ID
- **MNO**: MNO.PID = IDN.ID
- **OBS**: OBS.ID = IDN.ID
- **ODE**: ODE.ID = IDN.ID
- **OMT**: OMT.ID = IDN.ID
- **PEI**: PEI.ID = IDN.ID
- **PFT**: PFT.PID = IDN.ID
- **PGM**: PGM.PID = IDN.ID
- **PGR**: PGR.ID = IDN.ID
- **PIC**: PIC.ID = IDN.ID
- **PRE**: PRE.ID = IDN.ID
- **PRI**: PRI.ID = IDN.ID
- **PRS**: PRS.ID = IDN.ID
- **PSS**: PSS.ID = IDN.ID
- **RAL**: RAL.PID = IDN.ID
- **RCH**: RCH.ID = IDN.ID
- **RET**: RET.PID = IDN.ID
- **RFH**: RFH.ID = IDN.ID
- **RFI**: RFI.ID = IDN.ID
- **RJN**: RJN.PID = IDN.ID
- **RRQ**: RRQ.ID = IDN.ID
- **SAIT**: SAIT.ID = IDN.ID
- **SAR**: SAR.ID = IDN.ID
- **SBH**: SBH.PID = IDN.ID
- **SCO**: SCO.PID = IDN.ID
- **SCR**: SCR.ID = IDN.ID
- **SCS**: SCS.PID = IDN.ID
- **SED**: SED.ID = IDN.ID
- **SFL**: SFL.ID = IDN.ID
- **SGM**: SGM.ID = IDN.ID
- **SLD**: SLD.ID = IDN.ID
- **SLH**: SLH.ID = IDN.ID
- **SLLP**: SLLP.ID = IDN.ID
- **SRD**: SRD.ID = IDN.ID
- **SRK**: SRK.ID = IDN.ID
- **SSR**: SSR.ID = IDN.ID
- **STS**: STS.ID = IDN.ID
- **STU**: STU.ID = IDN.ID
- **SUIA**: SUIA.ID = IDN.ID
- **SWL**: SWL.ID = IDN.ID
- **TEX**: TEX.PID = IDN.ID
- **TPS**: TPS.PID = IDN.ID
- **TST**: TST.PID = IDN.ID
- **UCE**: UCE.ID = IDN.ID
- **VIC**: VIC.PID = IDN.ID
- **VIS**: VIS.PID = IDN.ID
- **VSN**: VSN.PID = IDN.ID
- **WIT**: WIT.PID = IDN.ID
- **WPT**: WPT.PID = IDN.ID

## Used in views

`AListofIDNandSTU`, `All Orphaned IDN Records`
