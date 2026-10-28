# Joins (generated 2026-10-28)

## Conventions

- One SQL Server database per school year, named DST<yy>000SanLeandroUSD (yy = year the school year starts). The schema is identical across years; only the data differs.
- Nearly every table has DEL (bit, 1 = soft-deleted) and DTS (datetime, last change). Always filter DEL = 0.
- Student rows are keyed by SC + SN (school code + school-level student number). STU.ID is the district-wide Permanent ID and is the key for IDN, ENR and other cross-school tables.
- STU.TG is the status tag: blank = active, anything else = inactive (I), no-show (N), etc. Active-student queries use ISNULL(STU.TG,'') = ''.
- Coded columns are decoded through COD: COD.TC = table code, COD.FC = field code, COD.CD = value, COD.DE = description. COD.SC = 0 means district-wide.
- Absence codes live in ABS (per school), not COD. ATT.AL is the all-day code; ATT.A0..A9 are the period codes for periods 0-9.
- Aeries writes an ATT row only on days a student has at least one mark. Present days have no ATT row, so days enrolled must come from DAY x ENR (or AHS/YTD summaries), never from COUNT(ATT).
- School days = DAY rows where HO = '' (HO holds a holiday / non-school indicator). Term boundaries are in TRM (TM = '1'..'4', 'F', 'S', 'Y'; D1 = start, D2 = end).
- Sections: MST.SE is the section number; SEC links students (SC, SN) to sections (SE); CRS.CN is the course number; TCH.TN is the teacher number; STU.CU holds the counselor's TCH.TN.
- POP holds school options including the grade-posting windows (NM = 'GradeStartDate1'..'GradeEndDate12', OV = mm/dd/yyyy text). These are the windows teachers post marks, not the term dates.
- Grade marks: GRD.M1..M12 are the marks for grade reporting windows 1..12. In this district M2 is the Q1 mark at the secondary schools (window 1 is the progress report).

Published by Aeries (table-relations article): TCH.TN → STU.CU (counselor, one-to-many); STU → SEC on SN; SEC → MST on SE; TCH → ADS on TN; STU is not directly related to MST (go through SEC); TCH is not related to DAY.

## Declared foreign keys (465)

| From | To | On |
|---|---|---|
| ACA | ACR | SC = ACR.SC AND SN = ACR.SN AND ASQ = ACR.SQ |
| ACA | SSS | SC = SSS.SC AND SN = SSS.SN AND PSQ = SSS.SQ |
| ACR | CRS | CN = CRS.CN |
| ACR | STU | SC = STU.SC AND SN = STU.SN |
| ACT | IDN | PID = IDN.ID |
| ADH | IDN | ID = IDN.ID |
| ADS | IDN | PID = IDN.ID |
| AED | IDN | ID = IDN.ID |
| AEF | AED | ID = AED.ID |
| AHD | IDN | ID = IDN.ID |
| AHS | IDN | ID = IDN.ID |
| AINV | IDN | ID = IDN.ID |
| ANA | ANC | NID = ANC.NID |
| ANL | ANC | NID = ANC.NID |
| ANL | IDN | ID = IDN.ID |
| ANS | ANC | NID = ANC.NID |
| APC | APL | PID = APL.PID AND SQ = APL.SQ |
| APL | IDN | PID = IDN.ID |
| ARB | IDN | ID = IDN.ID |
| ARD | IDN | ID = IDN.ID |
| ARH | IDN | ID = IDN.ID |
| ARI | ARC | IID = ARC.UID |
| ARI | IDN | ID = IDN.ID |
| ARP | ART | SC = ART.SC AND TR = ART.TR |
| ARR | IDN | ID = IDN.ID |
| ARS | IDN | ID = IDN.ID |
| ASL | TCH | SC = TCH.SC AND TN = TCH.TN |
| ATA | ATS | SCL = ATS.SC AND SE = ATS.SE |
| ATA | IDN | ID = IDN.ID |
| ATC | ATS | SC = ATS.SC AND SE = ATS.SE |
| ATD | ATS | SCL = ATS.SC AND SE = ATS.SE |
| ATD | IDN | ID = IDN.ID |
| ATN | STU | SC = STU.SC AND SN = STU.SN |
| ATR | ATS | SC = ATS.SC AND SE = ATS.SE |
| ATR | STF | ID = STF.ID |
| ATS | ATP | PR = ATP.PR |
| ATT | ABS | SC = ABS.SC AND AL = ABS.CD |
| ATT | DAY | SC = DAY.SC AND DY = DAY.DY |
| ATT | STU | SC = STU.SC AND SN = STU.SN |
| ATT | TCH | SC = TCH.SC AND TN = TCH.TN |
| AUT | IDN | PID = IDN.ID |
| AWL | IDN | ID = IDN.ID |
| AWL | MST | SCL = MST.SC AND SE = MST.SE |
| BAA | SBU | SC = SBU.SC AND SEQ = SBU.SEQ |
| BAC | SBU | SC = SBU.SC AND SEQ = SBU.SEQ |
| BEL | DAY | SC = DAY.SC AND DY = DAY.DY |
| BER | IDN | ID = IDN.ID |
| BGV | IDN | ID = IDN.ID |
| BIL | PST | SC = PST.SC AND PST = PST.ID |
| BIL | STU | SC = STU.SC AND SN = STU.SN |
| BSA | SBU | SSC = SBU.SC AND SEQ = SBU.SEQ |
| BST | BSD | SC = BSD.SC AND KY = BSD.KY |
| BWL | SBU | SCL = SBU.SC AND SEQ = SBU.SEQ |
| CAR | CRS | CN = CRS.CN |
| CAR | STU | SC = STU.SC AND SN = STU.SN |
| CAT | IDN | ID = IDN.ID |
| CBD | CBS | BID = CBS.BID |
| CCC | COL | ID = COL.ID |
| CCC | CRS | CN = CRS.CN |
| CCD | CCL | CSQ = CCL.SQ |
| CCH | CRS | CN = CRS.CN |
| CCI | IDN | ID = IDN.ID |
| CCP | CRS | CN = CRS.CN |
| CDC | CRS | CN = CRS.CN |
| CER | IDN | ID = IDN.ID |
| CHC | HIS | PID = HIS.PID AND HSQ = HIS.SQ |
| CHD | FTF | FSQ = FTF.SQ |
| CHD | IDN | ID = IDN.ID |
| CINV | IDN | ID = IDN.ID |
| CMP | CRS | CN = CRS.CN |
| CNF | IDN | PID = IDN.ID |
| CON | IDN | PID = IDN.ID |
| CPE | CPW | ID = CPW.ID AND CD = CPW.CD |
| CPH | CPW | ID = CPW.ID AND CD = CPW.CD |
| CPO | CPW | ID = CPW.ID AND CD = CPW.CD |
| CPR | CRS | CN = CRS.CN |
| CPW | IDN | ID = IDN.ID |
| CRA | CRC | RID = CRC.ID |
| CRF | CRS | CN = CRS.CN |
| CRG | CRC | RID = CRC.ID |
| CRG | CRI | IID = CRI.ID |
| CRP | CRD | SC = CRD.SC AND CD = CRD.CD |
| CRP | CRS | CN = CRS.CN |
| CRQ | CRS | CN = CRS.CN |
| CRT | COL | CN = COL.ID |
| CRT | IDN | PID = IDN.ID |
| CRUB | IDN | ID = IDN.ID |
| CSA | CSE | ID = CSE.ID |
| CSD | CSE | ID = CSE.ID |
| CSE | IDN | ID = IDN.ID |
| CSH | CSE | ID = CSE.ID |
| CSI | CSE | ID = CSE.ID |
| CSS | CSE | ID = CSE.ID |
| CST | IDN | PID = IDN.ID |
| CSV | CSE | ID = CSE.ID |
| CSX | IDN | ID = IDN.ID |
| CTE | IDN | ID = IDN.ID |
| CTF | CTD | TC = CTD.TC |
| CTI | IDN | ID = IDN.ID |
| CTS | IDN | PID = IDN.ID |
| DAC | STU | SC = STU.SC AND SN = STU.SN |
| DAG | DAI | AID = DAI.AID |
| DAM | DAA | NID = DAA.NID |
| DAQ | DAI | AID = DAI.AID |
| DAQ | IDN | ID = IDN.ID |
| DAS | DAI | AID = DAI.AID |
| DAT | DAI | AID = DAI.AID |
| DAU | DAA | NID = DAA.NID |
| DCA | DCS | DID = DCS.DID AND CL = DCS.CL |
| DCL | DCS | DID = DCS.DID AND CL = DCS.CL |
| DCL | STU | SC = STU.SC AND SN = STU.SN |
| DCS | DCV | DID = DCV.DID |
| DDS | IDN | ID = IDN.ID |
| DGG | DGW | WF = DGW.WF |
| DGS | DGP | GID = DGP.GID |
| DGT | DGP | GID = DGP.GID |
| DGV | IDN | ID = IDN.ID |
| DGW | DGP | GID = DGP.GID |
| DHS | CSE | ID = CSE.ID |
| DIG | DIO | IID = DIO.IID |
| DIP | DIO | IID = DIO.IID |
| DIS | IDN | PID = IDN.ID |
| DLH | IDN | ID = IDN.ID |
| DNT | IDN | PID = IDN.ID |
| DOC | IDN | ID = IDN.ID |
| DOF | DIT | IID = DIT.ID |
| DRA | DRI | RID = DRI.RID AND RIN = DRI.RIN |
| DRC | CRS | CN = CRS.CN |
| DRC | DRT | RID = DRT.RID |
| DRI | DRT | RID = DRT.RID |
| DSD | IDN | ID = IDN.ID |
| DSP | ADS | PID = ADS.PID AND SQ = ADS.SQ |
| DVC | DVG | GID = DVG.GID |
| DVR | DVD | VID = DVD.VID |
| DVU | DVG | GID = DVG.GID |
| DVU | UGN | UID = UGN.UID |
| ECA | IDN | ID = IDN.ID |
| ECD | IDN | ID = IDN.ID |
| ECO | IDN | ID = IDN.ID |
| ECP | IDN | ID = IDN.ID |
| EdFiTransactionErrors | EFR | TID = EFR.TID |
| EFB | EFO | CID = EFO.CID |
| EFC | EPK | PKID = EPK.PKID |
| EFCD | EFC | CID = EFC.CID AND DID = EFC.RID |
| EFCD | EFC | CID = EFC.CID AND RID = EFC.RID |
| EFE | EFO | CID = EFO.CID |
| EFF | EFT | JID = EFT.JID AND PKID = EFT.PKID |
| EFJ | EFB | BID = EFB.BID |
| EFJE | EFJ | JID = EFJ.JID |
| EFS | EFO | CID = EFO.CID |
| EFSD | EFO | CID = EFO.CID |
| EFT | EFJ | JID = EFJ.JID |
| EFT | EPK | PKID = EPK.PKID |
| ELO | LOC | SC = LOC.CD |
| ENR | IDN | ID = IDN.ID |
| EPL | ESN | EID = ESN.EID AND SID = ESN.SID |
| ERL | IDN | ID = IDN.ID |
| ESN | EXM | EID = EXM.EID |
| ESQ | ESN | EID = ESN.EID AND SID = ESN.SID |
| ESR | EXQ | EID = EXQ.EID AND QID = EXQ.QID |
| ETA | EXM | EID = EXM.EID |
| ETS | ETA | EID = ETA.EID AND TA = ETA.TA |
| ETS_Accommodation_Test | ETS_Accommodation | AID = ETS_Accommodation.ID |
| ETS_Accommodation_Test | ETS_Test | TID = ETS_Test.ID |
| EXA | EXR | ID = EXR.ID AND EID = EXR.EID AND SQ = EXR.SQ |
| EXC | EXQ | EID = EXQ.EID AND QID = EXQ.QID |
| EXG | EXT | TID = EXT.TID |
| EXH | EXM | EID = EXM.EID |
| EXH | LOC | SC = LOC.CD |
| EXL | EXM | EID = EXM.EID |
| EXP | ADS | PID = ADS.PID AND SQ = ADS.SQ |
| EXQ | EXM | EID = EXM.EID |
| EXR | EXM | EID = EXM.EID |
| EXS | EXQ | EID = EXQ.EID AND QID = EXQ.QID |
| EXV | EXQ | EID = EXQ.EID AND QID = EXQ.QID |
| FAP | FOF | ID = FOF.ID AND SQ = FOF.SQ |
| FDE | FOF | ID = FOF.ID AND SQ = FOF.SQ |
| FEC | FOF | ID = FOF.ID AND SQ = FOF.SQ |
| FEE | IDN | PID = IDN.ID |
| FLG | IDN | PID = IDN.ID |
| FLR | FLF | ID = FLF.ID |
| FOF | IDN | ID = IDN.ID |
| FPP | FOF | ID = FOF.ID AND SQ = FOF.SQ |
| FPS | IDN | ID = IDN.ID |
| FRE | IDN | ID = IDN.ID |
| FSA | IDN | ID = IDN.ID |
| FSC | IDN | ID = IDN.ID |
| FSD | FOF | ID = FOF.ID AND SQ = FOF.SQ |
| FSE | IDN | ID = IDN.ID |
| FSG | FSA | ID = FSA.ID AND RID = FSA.RID |
| FSH | IDN | ID = IDN.ID |
| FSI | IDN | ID = IDN.ID |
| FSL | IDN | ID = IDN.ID |
| FSM | IDN | ID = IDN.ID |
| FSN | IDN | ID = IDN.ID |
| FSP | IDN | ID = IDN.ID |
| FSR | IDN | ID = IDN.ID |
| FSS | IDN | ID = IDN.ID |
| FST | IDN | ID = IDN.ID |
| FTD | FTS | ID = FTS.ID |
| FTS | IDN | ID = IDN.ID |
| FTT | FTF | FSQ = FTF.SQ |
| GBA | GBK | GN = GBK.GN |
| GBD | GBS | SC = GBS.SC AND SN = GBS.SN AND GN = GBS.GN AND AN = GBS.AN |
| GBE | GBK | GN = GBK.GN |
| GBF | GBA | GN = GBA.GN AND AN = GBA.AN |
| GBF | TFL | FID = TFL.FID |
| GBM | GBC | CID = GBC.CID |
| GBN | GBA | GN = GBA.GN AND AN = GBA.AN |
| GBR | GBK | GN = GBK.GN |
| GBS | GBA | GN = GBA.GN AND AN = GBA.AN |
| GBS | GBU | SC = GBU.SC AND GN = GBU.GN AND SN = GBU.SN |
| GBS | STU | SC = STU.SC AND SN = STU.SN |
| GBT | GBK | GN = GBK.GN |
| GBU | GBK | GN = GBK.GN |
| GBU | STU | SC = STU.SC AND SN = STU.SN |
| GBV | GBR | GN = GBR.GN AND CD = GBR.CD |
| GBV | STU | SC = STU.SC AND SN = STU.SN |
| GEA | GEP | EPI = GEP.EPI |
| GEC | GEO | EPI = GEO.EPI AND RN = GEO.RN AND OID = GEO.OID |
| GEO | GEA | EPI = GEA.EPI AND RN = GEA.RN |
| GES | IDN | ID = IDN.ID |
| GPA | DGP | GID = DGP.GID |
| GPA | IDN | ID = IDN.ID |
| GPC | GPD | SC = GPD.SC AND GP1 = GPD.GP |
| GPS | GBU | SC = GBU.SC AND GN = GBU.GN AND SN = GBU.SN |
| GPS | GPD | SC = GPD.SC AND GP = GPD.GP |
| GRD | CRS | CN = CRS.CN |
| GRD | STU | SC = STU.SC AND SN = STU.SN |
| GRD | TCH | SC = TCH.SC AND TN = TCH.TN |
| GRG | IDN | PID = IDN.ID |
| GRH | GRD | SC = GRD.SC AND SN = GRD.SN AND PD = GRD.PD AND CN = GRD.CN AND TN = GRD.TN AND SE = GRD.SE |
| GRS | GRD | SC = GRD.SC AND SN = GRD.SN AND PD = GRD.PD AND CN = GRD.CN AND TN = GRD.TN AND SE = GRD.SE |
| GSS | GPD | SCL = GPD.SC AND GP = GPD.GP |
| GTC | GTR | ID = GTR.ID AND RSQ = GTR.SQ |
| GTE | IDN | ID = IDN.ID |
| GTG | GBK | GN = GBK.GN |
| GTN | GTR | ID = GTR.ID AND RSQ = GTR.SQ |
| GTR | GTE | ID = GTE.ID |
| GTS | GBU | SC = GBU.SC AND GN = GBU.GN AND SN = GBU.SN |
| GTT | GTE | ID = GTE.ID |
| HAM | IDN | ID = IDN.ID |
| HIS | CHI | ST = CHI.SCH |
| HIS | CRS | CN = CRS.CN |
| HIS | IDN | PID = IDN.ID |
| HRN | IDN | PID = IDN.ID |
| HSE | IDN | PID = IDN.ID |
| HSG | IDN | ID = IDN.ID |
| HWO | IDN | PID = IDN.ID |
| ICL | STU | SC = STU.SC AND SN = STU.SN |
| IMB | IDN | ID = IDN.ID |
| IMM | IDN | PID = IDN.ID |
| IMR | IMJ | GUID = IMJ.GUID |
| INA | ING | PID = ING.PID AND SQ = ING.SQ AND GSQ = ING.SQ1 |
| INC | INV | PID = INV.PID AND SQ = INV.SQ |
| ING | INV | PID = INV.PID AND SQ = INV.SQ |
| INM | INV | PID = INV.PID AND SQ = INV.SQ |
| INP | INV | PID = INV.PID AND SQ = INV.SQ |
| INR | INV | PID = INV.PID AND SQ = INV.SQ |
| INS | INV | PID = INV.PID AND SQ = INV.SQ |
| INV | IDN | PID = IDN.ID |
| IPI | INV | PID = INV.PID AND SQ = INV.SQ |
| IRC | INV | PID = INV.PID AND SQ = INV.SQ |
| ISA | IDN | ID = IDN.ID |
| ISG | ISA | ID = ISA.ID AND SQ = ISA.SQ |
| ISP | IDN | ID = IDN.ID |
| ISS | INV | PID = INV.PID AND SQ = INV.SQ |
| ISW | ISA | ID = ISA.ID AND SQ = ISA.SQ |
| IVS | ISP | ID = ISP.ID AND SQ = ISP.SQ |
| LAA | IDN | ID = IDN.ID |
| LAC | IDN | ID = IDN.ID |
| LAF | LAC | ID = LAC.ID |
| LAS | LAC | ID = LAC.ID |
| LAV | IDN | ID = IDN.ID |
| LCN | LOC | SC = LOC.CD |
| LEA | LTL | PID = LTL.PID AND ID = LTL.ID AND PT = LTL.PT AND LD = LTL.DT |
| LGD | IDN | ID = IDN.ID |
| LNC | MST | SC = MST.SC AND SE = MST.SE |
| LNC | TCH | SC = TCH.SC AND TN = TCH.TN |
| LSI | IDN | ID = IDN.ID |
| LTA | LTL | PID = LTL.PID AND ID = LTL.ID AND PT = LTL.PT AND LD = LTL.DT |
| LTL | IDN | PID = IDN.ID |
| MDF | MDP | SC = MDP.SC AND PI = MDP.PI |
| MED | IDN | PID = IDN.ID |
| MHS | IDN | PID = IDN.ID |
| MII | IDN | PID = IDN.ID |
| MLG | MLM | PID = MLM.PID AND CD = MLM.CD AND SQ = MLM.SQ |
| MLI | MLS | ID = MLS.ID |
| MLM | IDN | PID = IDN.ID |
| MLS | IDN | ID = IDN.ID |
| MNO | IDN | PID = IDN.ID |
| MSP | MST | SC = MST.SC AND SE = MST.SE |
| MSP | SPK | SC = SPK.SC AND CD = SPK.CD |
| MSS | MST | SC = MST.SC AND SE = MST.SE |
| MST | CRS | CN = CRS.CN |
| MST | TCH | SC = TCH.SC AND TN = TCH.TN |
| MSTM | STU | SC = STU.SC AND SN = STU.SN |
| NTU | NTF | NID = NTF.NID |
| OBL | LOC | SC = LOC.CD |
| OBL | OBD | OTY = OBD.OTY |
| OBO | OBC | CD = OBC.CD |
| OBS | IDN | ID = IDN.ID |
| OBS | OBC | CD = OBC.CD |
| OBT | OBD | OTY = OBD.OTY |
| OCM | ODC | CDS = ODC.CDS AND OCN = ODC.OCN |
| ODE | IDN | ID = IDN.ID |
| OGC | CRS | CN = CRS.CN |
| OHI | ODR | ODN = ODR.ODN |
| OMT | IDN | ID = IDN.ID |
| PAL | WEB | SC = WEB.SC AND ID = WEB.ID |
| PAO | PWA | AID = PWA.AID |
| PAY | BIL | SC = BIL.SC AND TN = BIL.TN |
| PCT | STU | SC = STU.SC AND SN = STU.SN |
| PDT | PDR | FID = PDR.FID |
| PEI | IDN | ID = IDN.ID |
| PEI | LOC | SCL = LOC.CD |
| PFT | IDN | PID = IDN.ID |
| PGM | IDN | PID = IDN.ID |
| PGR | IDN | ID = IDN.ID |
| PGS | PGM | PID = PGM.PID AND SQ = PGM.SQ |
| PHE | STU | SC = STU.SC AND SN = STU.SN |
| PIC | IDN | ID = IDN.ID |
| PNP | PWA | AID = PWA.AID |
| PRC | PRI | ID = PRI.ID AND SQ = PRI.SQ |
| PRD | PRS | ID = PRS.ID AND TY = PRS.TY AND SQ = PRS.SQ |
| PRE | IDN | ID = IDN.ID |
| PRI | IDN | ID = IDN.ID |
| PRN | PRI | ID = PRI.ID AND SQ = PRI.SQ |
| PRR | PRI | ID = PRI.ID AND SQ = PRI.SQ |
| PRS | IDN | ID = IDN.ID |
| PSA | STU | SC = STU.SC AND SN = STU.SN |
| PSB | STU | SC = STU.SC AND SN = STU.SN |
| PSD | PST | SC = PST.SC AND ID = PST.ID |
| PSS | IDN | ID = IDN.ID |
| PWS | PWA | AID = PWA.AID |
| RAL | IDN | PID = IDN.ID |
| RCH | IDN | ID = IDN.ID |
| REL | STU | SC = STU.SC AND SN = STU.SN |
| RET | IDN | PID = IDN.ID |
| RFD | RFH | ID = RFH.ID AND SQ = RFH.SQ |
| RFH | IDN | ID = IDN.ID |
| RFI | IDN | ID = IDN.ID |
| RFP | RFI | ID = RFI.ID AND SQ = RFI.SQ |
| RFR | RFI | ID = RFI.ID AND SQ = RFI.SQ |
| RFS | RFI | ID = RFI.ID AND SQ = RFI.SQ |
| RJN | IDN | PID = IDN.ID |
| RRI | RRQ | ID = RRQ.ID AND SQ = RRQ.SQ |
| RRQ | IDN | ID = IDN.ID |
| RVM | RVT | RID = RVT.RID |
| SAA | SAR | ID = SAR.ID AND SSC = SAR.SSC AND ASQ = SAR.SQ |
| SAA | SSR | ID = SSR.ID AND SSC = SSR.SSC AND PSQ = SSR.SQ |
| SAB | SBU | SSC = SBU.SC AND SEQ = SBU.SEQ |
| SAG | SAD | SC = SAD.SC AND KY = SAD.KY |
| SAIT | IDN | ID = IDN.ID |
| SAP | SAD | SC = SAD.SC AND KY = SAD.KY |
| SAP | STU | SC = STU.SC AND SN = STU.SN |
| SAR | IDN | ID = IDN.ID |
| SAR | SSC | SSC = SSC.SSC AND TM = SSC.TM AND CN = SSC.CN |
| SBC | STU | SC = STU.SC AND SN = STU.SN |
| SBD | SBS | ID = SBS.ID |
| SBD | STN | SD = STN.SD |
| SBE | STN | SD = STN.SD |
| SBG | STN | SD = STN.SD |
| SBG | STU | SC = STU.SC AND SN = STU.SN |
| SBH | IDN | PID = IDN.ID |
| SBH | STN | SD = STN.SD |
| SBR | CRS | CN = CRS.CN |
| SBR | STN | SD = STN.SD |
| SCD | SCR | ID = SCR.ID AND SQ = SCR.SQ |
| SCG | LOC | SC = LOC.CD |
| SCH | STF | SID = STF.ID |
| SCN | SCR | ID = SCR.ID AND SQ = SCR.SQ |
| SCO | IDN | PID = IDN.ID |
| SCP | STO | SC = STO.SC AND ID = STO.ID |
| SCP | STU | SC = STU.SC AND SN = STU.SN |
| SCR | IDN | ID = IDN.ID |
| SCS | IDN | PID = IDN.ID |
| SDT | SCH | SQ = SCH.SQ |
| SEC | MST | SC = MST.SC AND SE = MST.SE |
| SEC | STU | SC = STU.SC AND SN = STU.SN |
| SED | IDN | ID = IDN.ID |
| SFL | IDN | ID = IDN.ID |
| SGA | DAI | AID = DAI.AID |
| SGM | IDN | ID = IDN.ID |
| SGM | SGD | GI = SGD.GI |
| SGS | SGD | GI = SGD.GI |
| SGS | STF | ID = STF.ID |
| SLD | IDN | ID = IDN.ID |
| SLH | IDN | ID = IDN.ID |
| SLI | SLL | ID = SLL.ID AND RSQ = SLL.RSQ AND LSQ = SLL.SQ |
| SLL | SLR | ID = SLR.ID AND RSQ = SLR.SQ |
| SLLP | IDN | ID = IDN.ID |
| SLQ | SLO | OID = SLO.OID |
| SLR | SLD | ID = SLD.ID |
| SMB | SBU | SC = SBU.SC AND SEQ = SBU.SEQ |
| SMP | SMS | SC = SMS.SC AND SE = SMS.SE |
| SMP | SPK | SC = SPK.SC AND CD = SPK.CD |
| SMS | CRS | CN = CRS.CN |
| SMS | TCH | SC = TCH.SC AND TN = TCH.TN |
| SPC | STF | ID = STF.ID |
| SPP | STU | SC = STU.SC AND SN = STU.SN |
| SPR | LOC | SC = LOC.CD |
| SRB | SBU | SSC = SBU.SC AND SEQ = SBU.SEQ |
| SRD | IDN | ID = IDN.ID |
| SRK | IDN | ID = IDN.ID |
| SSA | LOC | SSC = LOC.CD |
| SSA | SST | SSC = SST.SSC AND TM = SST.TM |
| SSB | SBU | SC = SBU.SC AND SEQ = SBU.SEQ |
| SSC | CRS | CN = CRS.CN |
| SSC | SST | SSC = SST.SSC AND TM = SST.TM |
| SSD | STU | SC = STU.SC AND SN = STU.SN |
| SSE | MST | SC = MST.SC AND SE = MST.SE |
| SSI | STF | ID = STF.ID |
| SSM | SMS | SC = SMS.SC AND SE = SMS.SE |
| SSO | UGN | UID = UGN.UID |
| SSR | IDN | ID = IDN.ID |
| SSR | SSC | SSC = SSC.SSC AND TM = SSC.TM AND CN = SSC.CN |
| SSS | CRS | CN = CRS.CN |
| SSS | SMS | SC = SMS.SC AND SE = SMS.SE |
| SSS | STU | SC = STU.SC AND SN = STU.SN |
| SSS | TCH | SC = TCH.SC AND TN = TCH.TN |
| SST | LOC | SSC = LOC.CD |
| SSU | SBU | SC = SBU.SC AND SEQ = SBU.SEQ |
| STA | STF | ID = STF.ID |
| STC | STF | ID = STF.ID |
| STE | STF | ID = STF.ID |
| STH | STF | ID = STF.ID |
| STJ | STF | ID = STF.ID |
| STP | STO | SC = STO.SC AND ID = STO.ID |
| STS | IDN | ID = IDN.ID |
| STU | IDN | ID = IDN.ID |
| STU | TCH | SC = TCH.SC AND CU = TCH.TN |
| SUIA | IDN | ID = IDN.ID |
| SUP | STU | SC = STU.SC AND SN = STU.SN |
| SWL | IDN | ID = IDN.ID |
| SWL | SMS | SCL = SMS.SC AND SE = SMS.SE |
| TBC | MST | SC = MST.SC AND SE = MST.SE |
| TBC | STU | SC = STU.SC AND SN = STU.SN |
| TBC | TBT | SC = TBT.SC AND TN = TBT.TN |
| TBC | TCH | SC = TCH.SC AND TC = TCH.TN |
| TCH | STF | ID = STF.ID |
| TEX | IDN | PID = IDN.ID |
| TPO | TPN | PID = TPN.PID |
| TPP | TPN | PID = TPN.PID |
| TPS | IDN | PID = IDN.ID |
| TSD | SBR | PSD = SBR.SD AND CN = SBR.CN |
| TSD | STF | SID = STF.ID |
| TSO | STF | SID = STF.ID |
| TST | IDN | PID = IDN.ID |
| UAO | UGN | UID = UGN.UID |
| UCE | IDN | ID = IDN.ID |
| UGA | UGN | UID = UGN.UID |
| UGC | UGN | UID = UGN.UID |
| UGN | IdentityProvider | IDP = IdentityProvider.Id |
| UGP | UGN | UID = UGN.UID |
| VIC | IDN | PID = IDN.ID |
| VIS | IDN | PID = IDN.ID |
| VSN | IDN | PID = IDN.ID |
| WIA | WIG | WID = WIG.ID |
| WIH | WIG | WID = WIG.ID |
| WIT | IDN | PID = IDN.ID |
| WPT | EMP | EC = EMP.CD |
| WPT | IDN | PID = IDN.ID |
| WPV | WPT | PID = WPT.PID AND SQ = WPT.SQ |
| YTD | TCH | SC = TCH.SC AND TN = TCH.TN |

## Inferred joins (by Aeries column conventions; verify before relying on them)

| Table | Joins to | On |
|---|---|---|
| ABS | LOC | ABS.SC = LOC.CD |
| ACA | STU | ACA.SC = STU.SC AND ACA.SN = STU.SN |
| ACA | LOC | ACA.SC = LOC.CD |
| ACL | LOC | ACL.SC = LOC.CD |
| ACR | STU | ACR.SC = STU.SC AND ACR.SN = STU.SN |
| ACR | CRS | ACR.CN = CRS.CN |
| ACR | LOC | ACR.SC = LOC.CD |
| ADH | STU | ADH.ID = STU.ID |
| ADH | CRS | ADH.CN = CRS.CN |
| ADR | STU | ADR.ID = STU.ID |
| ADR | LOC | ADR.SC = LOC.CD |
| AED | STU | AED.ID = STU.ID |
| AEF | STU | AEF.ID = STU.ID |
| AHD | STU | AHD.ID = STU.ID |
| AHS | STU | AHS.ID = STU.ID |
| AINV | STU | AINV.ID = STU.ID |
| ANL | STU | ANL.SC = STU.SC AND ANL.SN = STU.SN |
| ANL | LOC | ANL.SC = LOC.CD |
| APC | CRS | APC.CN = CRS.CN |
| APL | CRS | APL.CN = CRS.CN |
| ARB | STU | ARB.ID = STU.ID |
| ARD | STU | ARD.ID = STU.ID |
| ARH | STU | ARH.ID = STU.ID |
| ARI | STU | ARI.ID = STU.ID |
| ARP | LOC | ARP.SC = LOC.CD |
| ARR | STU | ARR.ID = STU.ID |
| ARS | STU | ARS.ID = STU.ID |
| ART | LOC | ART.SC = LOC.CD |
| ASL | TCH | ASL.SC = TCH.SC AND ASL.TN = TCH.TN |
| ASL | LOC | ASL.SC = LOC.CD |
| ATA | STU | ATA.ID = STU.ID |
| ATC | MST | ATC.SC = MST.SC AND ATC.SE = MST.SE |
| ATC | LOC | ATC.SC = LOC.CD |
| ATD | STU | ATD.ID = STU.ID |
| ATL | STU | ATL.SC = STU.SC AND ATL.SN = STU.SN |
| ATL | LOC | ATL.SC = LOC.CD |
| ATN | STU | ATN.SC = STU.SC AND ATN.SN = STU.SN |
| ATN | MST | ATN.SC = MST.SC AND ATN.SE = MST.SE |
| ATN | LOC | ATN.SC = LOC.CD |
| ATR | STU | ATR.ID = STU.ID |
| ATR | MST | ATR.SC = MST.SC AND ATR.SE = MST.SE |
| ATR | LOC | ATR.SC = LOC.CD |
| ATS | MST | ATS.SC = MST.SC AND ATS.SE = MST.SE |
| ATS | CRS | ATS.CN = CRS.CN |
| ATS | TCH | ATS.SC = TCH.SC AND ATS.TN = TCH.TN |
| ATS | LOC | ATS.SC = LOC.CD |
| ATT | STU | ATT.SC = STU.SC AND ATT.SN = STU.SN |
| ATT | TCH | ATT.SC = TCH.SC AND ATT.TN = TCH.TN |
| ATT | LOC | ATT.SC = LOC.CD |
| AWL | STU | AWL.ID = STU.ID |
| BAA | STU | BAA.SC = STU.SC AND BAA.SN = STU.SN |
| BAA | LOC | BAA.SC = LOC.CD |
| BAC | STU | BAC.SC = STU.SC AND BAC.SN = STU.SN |
| BAC | CRS | BAC.CN = CRS.CN |
| BAC | LOC | BAC.SC = LOC.CD |
| BEL | LOC | BEL.SC = LOC.CD |
| BER | STU | BER.ID = STU.ID |
| BGV | STU | BGV.ID = STU.ID |
| BIL | STU | BIL.SC = STU.SC AND BIL.SN = STU.SN |
| BIL | TCH | BIL.SC = TCH.SC AND BIL.TN = TCH.TN |
| BIL | LOC | BIL.SC = LOC.CD |
| BSA | STU | BSA.ID = STU.ID |
| BSD | LOC | BSD.SC = LOC.CD |
| BST | LOC | BST.SC = LOC.CD |
| BWL | STU | BWL.ID = STU.ID |
| CAC | LOC | CAC.SC = LOC.CD |
| CAL | STU | CAL.ID = STU.ID |
| CAR | STU | CAR.SC = STU.SC AND CAR.SN = STU.SN |
| CAR | MST | CAR.SC = MST.SC AND CAR.SE = MST.SE |
| CAR | CRS | CAR.CN = CRS.CN |
| CAR | TCH | CAR.SC = TCH.SC AND CAR.TN = TCH.TN |
| CAR | LOC | CAR.SC = LOC.CD |
| CAS | MST | CAS.SC = MST.SC AND CAS.SE = MST.SE |
| CAS | LOC | CAS.SC = LOC.CD |
| CAT | STU | CAT.ID = STU.ID |
| CBD | STU | CBD.ID = STU.ID |
| CCC | STU | CCC.ID = STU.ID |
| CCC | CRS | CCC.CN = CRS.CN |
| CCC | LOC | CCC.SC = LOC.CD |
| CCH | CRS | CCH.CN = CRS.CN |
| CCI | STU | CCI.ID = STU.ID |
| CCL | LOC | CCL.SC = LOC.CD |
| CCP | CRS | CCP.CN = CRS.CN |
| CCP | LOC | CCP.SC = LOC.CD |
| CDC | CRS | CDC.CN = CRS.CN |
| CDI | LOC | CDI.SC = LOC.CD |
| CER | STU | CER.ID = STU.ID |
| CER | CRS | CER.CN = CRS.CN |
| CHD | STU | CHD.ID = STU.ID |
| CHI | STU | CHI.ID = STU.ID |
| CINV | STU | CINV.ID = STU.ID |
| CMP | CRS | CMP.CN = CRS.CN |
| COD | LOC | COD.SC = LOC.CD |
| COL | STU | COL.ID = STU.ID |
| CPE | STU | CPE.ID = STU.ID |
| CPH | STU | CPH.ID = STU.ID |
| CPO | STU | CPO.ID = STU.ID |
| CPR | CRS | CPR.CN = CRS.CN |
| CPW | STU | CPW.ID = STU.ID |
| CRC | STU | CRC.ID = STU.ID |
| CRD | LOC | CRD.SC = LOC.CD |
| CRF | CRS | CRF.CN = CRS.CN |
| CRI | STU | CRI.ID = STU.ID |
| CRL | STU | CRL.ID = STU.ID |
| CRP | CRS | CRP.CN = CRS.CN |
| CRP | LOC | CRP.SC = LOC.CD |
| CRQ | CRS | CRQ.CN = CRS.CN |
| CRQ | LOC | CRQ.SC = LOC.CD |
| CRT | CRS | CRT.CN = CRS.CN |
| CRUB | STU | CRUB.ID = STU.ID |
| CSA | STU | CSA.ID = STU.ID |
| CSD | STU | CSD.ID = STU.ID |
| CSE | STU | CSE.SC = STU.SC AND CSE.SN = STU.SN |
| CSE | MST | CSE.SC = MST.SC AND CSE.SE = MST.SE |
| CSE | TCH | CSE.SC = TCH.SC AND CSE.TN = TCH.TN |
| CSE | LOC | CSE.SC = LOC.CD |
| CSH | STU | CSH.ID = STU.ID |
| CSI | STU | CSI.ID = STU.ID |
| CSN | STU | CSN.ID = STU.ID |
| CSQ | LOC | CSQ.SC = LOC.CD |
| CSS | STU | CSS.ID = STU.ID |
| CST | STU | CST.ID = STU.ID |
| CSV | STU | CSV.ID = STU.ID |
| CSX | STU | CSX.ID = STU.ID |
| CTE | STU | CTE.ID = STU.ID |
| CTI | STU | CTI.ID = STU.ID |
| CVR | STU | CVR.ID = STU.ID |
| CVR | MST | CVR.SC = MST.SC AND CVR.SE = MST.SE |
| CVR | TCH | CVR.SC = TCH.SC AND CVR.TN = TCH.TN |
| CVR | LOC | CVR.SC = LOC.CD |
| CVT | TCH | CVT.SC = TCH.SC AND CVT.TN = TCH.TN |
| CVT | LOC | CVT.SC = LOC.CD |
| DAA | STU | DAA.SC = STU.SC AND DAA.SN = STU.SN |
| DAA | LOC | DAA.SC = LOC.CD |
| DAC | STU | DAC.SC = STU.SC AND DAC.SN = STU.SN |
| DAC | TCH | DAC.SC = TCH.SC AND DAC.TN = TCH.TN |
| DAC | LOC | DAC.SC = LOC.CD |
| DAQ | STU | DAQ.ID = STU.ID |
| DAY | LOC | DAY.SC = LOC.CD |
| DCL | STU | DCL.SC = STU.SC AND DCL.SN = STU.SN |
| DCL | LOC | DCL.SC = LOC.CD |
| DDR | STU | DDR.ID = STU.ID |
| DDS | STU | DDS.ID = STU.ID |
| DGV | STU | DGV.ID = STU.ID |
| DHS | STU | DHS.ID = STU.ID |
| DIS | CRS | DIS.CN = CRS.CN |
| DIT | STU | DIT.ID = STU.ID |
| DIT | CRS | DIT.CN = CRS.CN |
| DLH | STU | DLH.ID = STU.ID |
| DOC | STU | DOC.ID = STU.ID |
| DRA | STU | DRA.ID = STU.ID |
| DRA | CRS | DRA.CN = CRS.CN |
| DRC | CRS | DRC.CN = CRS.CN |
| DSD | STU | DSD.ID = STU.ID |
| DVS | STU | DVS.ID = STU.ID |
| ECA | STU | ECA.ID = STU.ID |
| ECD | STU | ECD.ID = STU.ID |
| ECO | STU | ECO.ID = STU.ID |
| ECP | STU | ECP.ID = STU.ID |
| EFS | LOC | EFS.SC = LOC.CD |
| ELO | LOC | ELO.SC = LOC.CD |
| EMP | CRS | EMP.CN = CRS.CN |
| ENR | STU | ENR.SC = STU.SC AND ENR.SN = STU.SN |
| ENR | TCH | ENR.SC = TCH.SC AND ENR.TN = TCH.TN |
| ENR | LOC | ENR.SC = LOC.CD |
| ERL | STU | ERL.ID = STU.ID |
| ESD | STU | ESD.ID = STU.ID |
| ESI | STU | ESI.ID = STU.ID |
| ETS | STU | ETS.SC = STU.SC AND ETS.SN = STU.SN |
| ETS | TCH | ETS.SC = TCH.SC AND ETS.TN = TCH.TN |
| ETS | LOC | ETS.SC = LOC.CD |
| ETS_Accommodation | STU | ETS_Accommodation.ID = STU.ID |
| ETS_Test | STU | ETS_Test.ID = STU.ID |
| EXA | STU | EXA.ID = STU.ID |
| EXH | LOC | EXH.SC = LOC.CD |
| EXL | LOC | EXL.SC = LOC.CD |
| EXM | STU | EXM.ID = STU.ID |
| EXR | STU | EXR.ID = STU.ID |
| FAP | STU | FAP.ID = STU.ID |
| FDE | STU | FDE.ID = STU.ID |
| FEC | STU | FEC.ID = STU.ID |
| FLF | STU | FLF.ID = STU.ID |
| FLF | CRS | FLF.CN = CRS.CN |
| FLR | STU | FLR.ID = STU.ID |
| FOF | STU | FOF.ID = STU.ID |
| FOF | CRS | FOF.CN = CRS.CN |
| FPP | STU | FPP.ID = STU.ID |
| FPS | STU | FPS.ID = STU.ID |
| FRE | STU | FRE.ID = STU.ID |
| FRE_HIST | STU | FRE_HIST.ID = STU.ID |
| FSA | STU | FSA.ID = STU.ID |
| FSC | STU | FSC.ID = STU.ID |
| FSD | STU | FSD.ID = STU.ID |
| FSE | STU | FSE.ID = STU.ID |
| FSG | STU | FSG.ID = STU.ID |
| FSH | STU | FSH.ID = STU.ID |
| FSI | STU | FSI.ID = STU.ID |
| FSL | STU | FSL.ID = STU.ID |
| FSM | STU | FSM.ID = STU.ID |
| FSN | STU | FSN.ID = STU.ID |
| FSP | STU | FSP.ID = STU.ID |
| FSR | STU | FSR.ID = STU.ID |
| FSS | STU | FSS.ID = STU.ID |
| FST | STU | FST.ID = STU.ID |
| FTD | STU | FTD.ID = STU.ID |
| FTD | CRS | FTD.CN = CRS.CN |
| FTF | LOC | FTF.SC = LOC.CD |
| FTS | STU | FTS.ID = STU.ID |
| GAL | STU | GAL.ID = STU.ID |
| GBB | TCH | GBB.SC = TCH.SC AND GBB.TN = TCH.TN |
| GBB | LOC | GBB.SC = LOC.CD |
| GBC | TCH | GBC.SC = TCH.SC AND GBC.TN = TCH.TN |
| GBC | LOC | GBC.SC = LOC.CD |
| GBD | STU | GBD.SC = STU.SC AND GBD.SN = STU.SN |
| GBD | LOC | GBD.SC = LOC.CD |
| GBE | MST | GBE.SC = MST.SC AND GBE.SE = MST.SE |
| GBE | LOC | GBE.SC = LOC.CD |
| GBK | TCH | GBK.SC = TCH.SC AND GBK.TN = TCH.TN |
| GBK | LOC | GBK.SC = LOC.CD |
| GBL | LOC | GBL.SC = LOC.CD |
| GBO | STU | GBO.ID = STU.ID |
| GBO | LOC | GBO.SC = LOC.CD |
| GBS | STU | GBS.SC = STU.SC AND GBS.SN = STU.SN |
| GBS | LOC | GBS.SC = LOC.CD |
| GBU | STU | GBU.SC = STU.SC AND GBU.SN = STU.SN |
| GBU | LOC | GBU.SC = LOC.CD |
| GBV | STU | GBV.SC = STU.SC AND GBV.SN = STU.SN |
| GBV | LOC | GBV.SC = LOC.CD |
| GES | STU | GES.ID = STU.ID |
| GPA | STU | GPA.ID = STU.ID |
| GPC | LOC | GPC.SC = LOC.CD |
| GPD | LOC | GPD.SC = LOC.CD |
| GPS | STU | GPS.SC = STU.SC AND GPS.SN = STU.SN |
| GPS | LOC | GPS.SC = LOC.CD |
| GRC | LOC | GRC.SC = LOC.CD |
| GRD | STU | GRD.SC = STU.SC AND GRD.SN = STU.SN |
| GRD | MST | GRD.SC = MST.SC AND GRD.SE = MST.SE |
| GRD | CRS | GRD.CN = CRS.CN |
| GRD | TCH | GRD.SC = TCH.SC AND GRD.TN = TCH.TN |
| GRD | LOC | GRD.SC = LOC.CD |
| GRH | STU | GRH.SC = STU.SC AND GRH.SN = STU.SN |
| GRH | MST | GRH.SC = MST.SC AND GRH.SE = MST.SE |
| GRH | CRS | GRH.CN = CRS.CN |
| GRH | TCH | GRH.SC = TCH.SC AND GRH.TN = TCH.TN |
| GRH | LOC | GRH.SC = LOC.CD |
| GRO | LOC | GRO.SC = LOC.CD |
| GRP | LOC | GRP.SC = LOC.CD |
| GRS | STU | GRS.SC = STU.SC AND GRS.SN = STU.SN |
| GRS | MST | GRS.SC = MST.SC AND GRS.SE = MST.SE |
| GRS | CRS | GRS.CN = CRS.CN |
| GRS | TCH | GRS.SC = TCH.SC AND GRS.TN = TCH.TN |
| GRS | LOC | GRS.SC = LOC.CD |
| GSS | STU | GSS.ID = STU.ID |
| GTC | STU | GTC.ID = STU.ID |
| GTE | STU | GTE.ID = STU.ID |
| GTN | STU | GTN.ID = STU.ID |
| GTR | STU | GTR.ID = STU.ID |
| GTS | STU | GTS.SC = STU.SC AND GTS.SN = STU.SN |
| GTS | LOC | GTS.SC = LOC.CD |
| GTT | STU | GTT.ID = STU.ID |
| HAM | STU | HAM.ID = STU.ID |
| HIS | CRS | HIS.CN = CRS.CN |
| his_20260817 | CRS | his_20260817.CN = CRS.CN |
| his_20261015 | CRS | his_20261015.CN = CRS.CN |
| HIS_backup_20260807 | CRS | HIS_backup_20260807.CN = CRS.CN |
| HIS_backup_20260929_0212 | CRS | HIS_backup_20260929_0212.CN = CRS.CN |
| HRN | STU | HRN.ID = STU.ID |
| HSG | STU | HSG.ID = STU.ID |
| ICL | STU | ICL.SC = STU.SC AND ICL.SN = STU.SN |
| ICL | LOC | ICL.SC = LOC.CD |
| IdentityProvider | STU | IdentityProvider.ID = STU.ID |
| IMB | STU | IMB.ID = STU.ID |
| IMC | MST | IMC.SC = MST.SC AND IMC.SE = MST.SE |
| IMC | TCH | IMC.SC = TCH.SC AND IMC.TN = TCH.TN |
| IMC | LOC | IMC.SC = LOC.CD |
| IPR | LOC | IPR.SC = LOC.CD |
| ISA | STU | ISA.ID = STU.ID |
| ISG | STU | ISG.ID = STU.ID |
| ISP | STU | ISP.ID = STU.ID |
| ISP | CRS | ISP.CN = CRS.CN |
| ISW | STU | ISW.ID = STU.ID |
| IVS | STU | IVS.ID = STU.ID |
| LAA | STU | LAA.ID = STU.ID |
| LAC | STU | LAC.ID = STU.ID |
| LAF | STU | LAF.ID = STU.ID |
| LAS | STU | LAS.ID = STU.ID |
| LAV | STU | LAV.ID = STU.ID |
| LCN | LOC | LCN.SC = LOC.CD |
| LEA | STU | LEA.ID = STU.ID |
| LEC | STU | LEC.ID = STU.ID |
| LEC | LOC | LEC.SC = LOC.CD |
| LET | STU | LET.ID = STU.ID |
| LET | LOC | LET.SC = LOC.CD |
| LGD | STU | LGD.SC = STU.SC AND LGD.SN = STU.SN |
| LGD | LOC | LGD.SC = LOC.CD |
| LKR | STU | LKR.SC = STU.SC AND LKR.SN = STU.SN |
| LKR | MST | LKR.SC = MST.SC AND LKR.SE = MST.SE |
| LKR | LOC | LKR.SC = LOC.CD |
| LKR_backup_20260804 | STU | LKR_backup_20260804.SC = STU.SC AND LKR_backup_20260804.SN = STU.SN |
| LKR_backup_20260804 | MST | LKR_backup_20260804.SC = MST.SC AND LKR_backup_20260804.SE = MST.SE |
| LKR_backup_20260804 | LOC | LKR_backup_20260804.SC = LOC.CD |
| LNC | MST | LNC.SC = MST.SC AND LNC.SE = MST.SE |
| LNC | TCH | LNC.SC = TCH.SC AND LNC.TN = TCH.TN |
| LNC | LOC | LNC.SC = LOC.CD |
| LNK | LOC | LNK.SC = LOC.CD |
| LOG | STU | LOG.SC = STU.SC AND LOG.SN = STU.SN |
| LOG | LOC | LOG.SC = LOC.CD |
| LSI | STU | LSI.ID = STU.ID |
| LTA | STU | LTA.ID = STU.ID |
| LTL | STU | LTL.ID = STU.ID |
| LTR | STU | LTR.ID = STU.ID |
| LTR | LOC | LTR.SC = LOC.CD |
| MDF | STU | MDF.ID = STU.ID |
| MDF | TCH | MDF.SC = TCH.SC AND MDF.TN = TCH.TN |
| MDF | LOC | MDF.SC = LOC.CD |
| MDP | MST | MDP.SC = MST.SC AND MDP.SE = MST.SE |
| MDP | LOC | MDP.SC = LOC.CD |
| MLI | STU | MLI.ID = STU.ID |
| MLS | STU | MLS.ID = STU.ID |
| MSP | MST | MSP.SC = MST.SC AND MSP.SE = MST.SE |
| MSP | LOC | MSP.SC = LOC.CD |
| MSS | MST | MSS.SC = MST.SC AND MSS.SE = MST.SE |
| MSS | LOC | MSS.SC = LOC.CD |
| MST | CRS | MST.CN = CRS.CN |
| MST | TCH | MST.SC = TCH.SC AND MST.TN = TCH.TN |
| MST | LOC | MST.SC = LOC.CD |
| MSTM | STU | MSTM.SC = STU.SC AND MSTM.SN = STU.SN |
| MSTM | TCH | MSTM.SC = TCH.SC AND MSTM.TN = TCH.TN |
| MSTM | LOC | MSTM.SC = LOC.CD |
| NAV | LOC | NAV.SC = LOC.CD |
| NDY | LOC | NDY.SC = LOC.CD |
| NTF | LOC | NTF.SC = LOC.CD |
| NTM | LOC | NTM.SC = LOC.CD |
| NWS | LOC | NWS.SC = LOC.CD |
| OBJ | TCH | OBJ.SC = TCH.SC AND OBJ.TN = TCH.TN |
| OBJ | LOC | OBJ.SC = LOC.CD |
| OBL | LOC | OBL.SC = LOC.CD |
| OBS | STU | OBS.ID = STU.ID |
| OCM | CRS | OCM.CN = CRS.CN |
| ODE | STU | ODE.ID = STU.ID |
| OGC | CRS | OGC.CN = CRS.CN |
| OGC | LOC | OGC.SC = LOC.CD |
| OHI | LOC | OHI.SC = LOC.CD |
| OMT | STU | OMT.ID = STU.ID |
| OPT | LOC | OPT.SC = LOC.CD |
| PAL | STU | PAL.SC = STU.SC AND PAL.SN = STU.SN |
| PAL | LOC | PAL.SC = LOC.CD |
| PAY | CRS | PAY.CN = CRS.CN |
| PAY | TCH | PAY.SC = TCH.SC AND PAY.TN = TCH.TN |
| PAY | LOC | PAY.SC = LOC.CD |
| PCT | STU | PCT.SC = STU.SC AND PCT.SN = STU.SN |
| PCT | LOC | PCT.SC = LOC.CD |
| PEI | STU | PEI.ID = STU.ID |
| PFS | LOC | PFS.SC = LOC.CD |
| PGR | STU | PGR.ID = STU.ID |
| PHE | STU | PHE.SC = STU.SC AND PHE.SN = STU.SN |
| PHE | LOC | PHE.SC = LOC.CD |
| PHL | STU | PHL.SC = STU.SC AND PHL.SN = STU.SN |
| PHL | LOC | PHL.SC = LOC.CD |
| PIC | STU | PIC.ID = STU.ID |
| POP | LOC | POP.SC = LOC.CD |
| PRC | STU | PRC.ID = STU.ID |
| PRD | STU | PRD.ID = STU.ID |
| PRE | STU | PRE.ID = STU.ID |
| PRE | CRS | PRE.CN = CRS.CN |
| PRE | LOC | PRE.SC = LOC.CD |
| PRI | STU | PRI.ID = STU.ID |
| PRN | STU | PRN.ID = STU.ID |
| PRR | STU | PRR.ID = STU.ID |
| PRS | STU | PRS.ID = STU.ID |
| PRT | LOC | PRT.SC = LOC.CD |
| PSA | STU | PSA.SC = STU.SC AND PSA.SN = STU.SN |
| PSA | LOC | PSA.SC = LOC.CD |
| PSB | STU | PSB.SC = STU.SC AND PSB.SN = STU.SN |
| PSB | MST | PSB.SC = MST.SC AND PSB.SE = MST.SE |
| PSB | LOC | PSB.SC = LOC.CD |
| PSD | STU | PSD.ID = STU.ID |
| PSD | LOC | PSD.SC = LOC.CD |
| PSS | STU | PSS.ID = STU.ID |
| PST | STU | PST.ID = STU.ID |
| PST | LOC | PST.SC = LOC.CD |
| PWS | STU | PWS.ID = STU.ID |
| QRY | LOC | QRY.SC = LOC.CD |
| RCH | STU | RCH.ID = STU.ID |
| REL | STU | REL.SC = STU.SC AND REL.SN = STU.SN |
| REL | LOC | REL.SC = LOC.CD |
| REQ | LOC | REQ.SC = LOC.CD |
| RFD | STU | RFD.ID = STU.ID |
| RFH | STU | RFH.ID = STU.ID |
| RFI | STU | RFI.ID = STU.ID |
| RFP | STU | RFP.ID = STU.ID |
| RFR | STU | RFR.ID = STU.ID |
| RFS | STU | RFS.ID = STU.ID |
| ROL | LOC | ROL.SC = LOC.CD |
| RPP | LOC | RPP.SC = LOC.CD |
| RRI | STU | RRI.ID = STU.ID |
| RRQ | STU | RRQ.ID = STU.ID |
| RT_CHI | STU | RT_CHI.ID = STU.ID |
| RT_CST | STU | RT_CST.ID = STU.ID |
| RT_HIS | CRS | RT_HIS.CN = CRS.CN |
| RT_TST | STU | RT_TST.ID = STU.ID |
| RTG | STU | RTG.SC = STU.SC AND RTG.SN = STU.SN |
| RTG | LOC | RTG.SC = LOC.CD |
| RTO | STU | RTO.ID = STU.ID |
| RTR | STU | RTR.ID = STU.ID |
| SAA | STU | SAA.ID = STU.ID |
| SAB | STU | SAB.ID = STU.ID |
| SAB | CRS | SAB.CN = CRS.CN |
| SAD | LOC | SAD.SC = LOC.CD |
| SAG | LOC | SAG.SC = LOC.CD |
| SAIT | STU | SAIT.ID = STU.ID |
| SAP | STU | SAP.SC = STU.SC AND SAP.SN = STU.SN |
| SAP | LOC | SAP.SC = LOC.CD |
| SAR | STU | SAR.ID = STU.ID |
| SAR | CRS | SAR.CN = CRS.CN |
| SAV | STU | SAV.SC = STU.SC AND SAV.SN = STU.SN |
| SAV | MST | SAV.SC = MST.SC AND SAV.SE = MST.SE |
| SAV | LOC | SAV.SC = LOC.CD |
| SBC | STU | SBC.SC = STU.SC AND SBC.SN = STU.SN |
| SBC | LOC | SBC.SC = LOC.CD |
| SBD | STU | SBD.ID = STU.ID |
| SBG | STU | SBG.SC = STU.SC AND SBG.SN = STU.SN |
| SBG | LOC | SBG.SC = LOC.CD |
| SBG_20261026_105401 | STU | SBG_20261026_105401.SC = STU.SC AND SBG_20261026_105401.SN = STU.SN |
| SBG_20261026_105401 | LOC | SBG_20261026_105401.SC = LOC.CD |
| SBR | CRS | SBR.CN = CRS.CN |
| SBS | STU | SBS.ID = STU.ID |
| SBU | LOC | SBU.SC = LOC.CD |
| SCD | STU | SCD.ID = STU.ID |
| SCG | LOC | SCG.SC = LOC.CD |
| SCH | MST | SCH.SC = MST.SC AND SCH.SE = MST.SE |
| SCH | LOC | SCH.SC = LOC.CD |
| SCN | STU | SCN.ID = STU.ID |
| SCP | STU | SCP.SC = STU.SC AND SCP.SN = STU.SN |
| SCP | CRS | SCP.CN = CRS.CN |
| SCP | TCH | SCP.SC = TCH.SC AND SCP.TN = TCH.TN |
| SCP | LOC | SCP.SC = LOC.CD |
| SCR | STU | SCR.ID = STU.ID |
| SDT | STU | SDT.ID = STU.ID |
| SDT | MST | SDT.SC = MST.SC AND SDT.SE = MST.SE |
| SDT | LOC | SDT.SC = LOC.CD |
| SEC | STU | SEC.SC = STU.SC AND SEC.SN = STU.SN |
| SEC | MST | SEC.SC = MST.SC AND SEC.SE = MST.SE |
| SEC | CRS | SEC.CN = CRS.CN |
| SEC | LOC | SEC.SC = LOC.CD |
| SED | STU | SED.ID = STU.ID |
| SFL | STU | SFL.ID = STU.ID |
| SGM | STU | SGM.ID = STU.ID |
| SGS | STU | SGS.ID = STU.ID |
| SLD | STU | SLD.ID = STU.ID |
| SLH | STU | SLH.ID = STU.ID |
| SLI | STU | SLI.ID = STU.ID |
| SLL | STU | SLL.ID = STU.ID |
| SLLP | STU | SLLP.ID = STU.ID |
| SLR | STU | SLR.ID = STU.ID |
| SMB | MST | SMB.SC = MST.SC AND SMB.SE = MST.SE |
| SMB | CRS | SMB.CN = CRS.CN |
| SMB | TCH | SMB.SC = TCH.SC AND SMB.TN = TCH.TN |
| SMB | LOC | SMB.SC = LOC.CD |
| SMP | MST | SMP.SC = MST.SC AND SMP.SE = MST.SE |
| SMP | LOC | SMP.SC = LOC.CD |
| SMS | MST | SMS.SC = MST.SC AND SMS.SE = MST.SE |
| SMS | CRS | SMS.CN = CRS.CN |
| SMS | TCH | SMS.SC = TCH.SC AND SMS.TN = TCH.TN |
| SMS | LOC | SMS.SC = LOC.CD |
| SPC | STU | SPC.ID = STU.ID |
| SPK | LOC | SPK.SC = LOC.CD |
| SPP | STU | SPP.SC = STU.SC AND SPP.SN = STU.SN |
| SPP | LOC | SPP.SC = LOC.CD |
| SPR | LOC | SPR.SC = LOC.CD |
| SPS | LOC | SPS.SC = LOC.CD |
| SRB | STU | SRB.ID = STU.ID |
| SRB | CRS | SRB.CN = CRS.CN |
| SRD | STU | SRD.ID = STU.ID |
| SRK | STU | SRK.ID = STU.ID |
| SRK | CRS | SRK.CN = CRS.CN |
| SRR | MST | SRR.SC = MST.SC AND SRR.SE = MST.SE |
| SRR | LOC | SRR.SC = LOC.CD |
| SSB | STU | SSB.SC = STU.SC AND SSB.SN = STU.SN |
| SSB | MST | SSB.SC = MST.SC AND SSB.SE = MST.SE |
| SSB | CRS | SSB.CN = CRS.CN |
| SSB | TCH | SSB.SC = TCH.SC AND SSB.TN = TCH.TN |
| SSB | LOC | SSB.SC = LOC.CD |
| SSC | CRS | SSC.CN = CRS.CN |
| SSD | STU | SSD.SC = STU.SC AND SSD.SN = STU.SN |
| SSD | LOC | SSD.SC = LOC.CD |
| SSE | STU | SSE.ID = STU.ID |
| SSE | MST | SSE.SC = MST.SC AND SSE.SE = MST.SE |
| SSE | LOC | SSE.SC = LOC.CD |
| SSI | STU | SSI.ID = STU.ID |
| SSM | STU | SSM.ID = STU.ID |
| SSM | MST | SSM.SC = MST.SC AND SSM.SE = MST.SE |
| SSM | LOC | SSM.SC = LOC.CD |
| SSR | STU | SSR.ID = STU.ID |
| SSR | CRS | SSR.CN = CRS.CN |
| SSS | STU | SSS.SC = STU.SC AND SSS.SN = STU.SN |
| SSS | MST | SSS.SC = MST.SC AND SSS.SE = MST.SE |
| SSS | CRS | SSS.CN = CRS.CN |
| SSS | TCH | SSS.SC = TCH.SC AND SSS.TN = TCH.TN |
| SSS | LOC | SSS.SC = LOC.CD |
| SSU | STU | SSU.ID = STU.ID |
| SSU | MST | SSU.SC = MST.SC AND SSU.SE = MST.SE |
| SSU | LOC | SSU.SC = LOC.CD |
| STA | STU | STA.ID = STU.ID |
| STAR | STU | STAR.SC = STU.SC AND STAR.SN = STU.SN |
| STAR | MST | STAR.SC = MST.SC AND STAR.SE = MST.SE |
| STAR | LOC | STAR.SC = LOC.CD |
| STC | STU | STC.ID = STU.ID |
| STE | STU | STE.ID = STU.ID |
| STG | STU | STG.SC = STU.SC AND STG.SN = STU.SN |
| STG | MST | STG.SC = MST.SC AND STG.SE = MST.SE |
| STG | LOC | STG.SC = LOC.CD |
| STH | STU | STH.ID = STU.ID |
| STJ | STU | STJ.ID = STU.ID |
| STO | STU | STO.ID = STU.ID |
| STO | CRS | STO.CN = CRS.CN |
| STO | LOC | STO.SC = LOC.CD |
| STP | STU | STP.ID = STU.ID |
| STP | LOC | STP.SC = LOC.CD |
| STS | STU | STS.ID = STU.ID |
| STU | LOC | STU.SC = LOC.CD |
| STU | TCH | STU.SC = TCH.SC AND STU.CU = TCH.TN |
| STU | IDN | STU.ID = IDN.ID |
| SUIA | STU | SUIA.ID = STU.ID |
| SUP | STU | SUP.SC = STU.SC AND SUP.SN = STU.SN |
| SUP | TCH | SUP.SC = TCH.SC AND SUP.TN = TCH.TN |
| SUP | LOC | SUP.SC = LOC.CD |
| SVC | STU | SVC.ID = STU.ID |
| SVC | LOC | SVC.SC = LOC.CD |
| SWL | STU | SWL.ID = STU.ID |
| TAA | LOC | TAA.SC = LOC.CD |
| TAD | STU | TAD.ID = STU.ID |
| TBC | STU | TBC.SC = STU.SC AND TBC.SN = STU.SN |
| TBC | MST | TBC.SC = MST.SC AND TBC.SE = MST.SE |
| TBC | CRS | TBC.CN = CRS.CN |
| TBC | TCH | TBC.SC = TCH.SC AND TBC.TN = TCH.TN |
| TBC | LOC | TBC.SC = LOC.CD |
| TBO | LOC | TBO.SC = LOC.CD |
| TBT | TCH | TBT.SC = TCH.SC AND TBT.TN = TCH.TN |
| TBT | LOC | TBT.SC = LOC.CD |
| TCH | STU | TCH.ID = STU.ID |
| TCH | LOC | TCH.SC = LOC.CD |
| TDF | LOC | TDF.SC = LOC.CD |
| TEX | STU | TEX.ID = STU.ID |
| TNP | STU | TNP.ID = STU.ID |
| TRM | LOC | TRM.SC = LOC.CD |
| TSA | STU | TSA.SC = STU.SC AND TSA.SN = STU.SN |
| TSA | LOC | TSA.SC = LOC.CD |
| TSD | CRS | TSD.CN = CRS.CN |
| TSI | STU | TSI.ID = STU.ID |
| TSO | CRS | TSO.CN = CRS.CN |
| TST | STU | TST.ID = STU.ID |
| tst_backup_gate2025 | STU | tst_backup_gate2025.ID = STU.ID |
| TTM | LOC | TTM.SC = LOC.CD |
| TTP | TCH | TTP.SC = TCH.SC AND TTP.TN = TCH.TN |
| TTP | LOC | TTP.SC = LOC.CD |
| TXT | STU | TXT.ID = STU.ID |
| TXT | LOC | TXT.SC = LOC.CD |
| UCE | STU | UCE.ID = STU.ID |
| UCE | LOC | UCE.SC = LOC.CD |
| UGN | STU | UGN.ID = STU.ID |
| UGP | LOC | UGP.SC = LOC.CD |
| VER | STU | VER.SC = STU.SC AND VER.SN = STU.SN |
| VER | LOC | VER.SC = LOC.CD |
| VND | STU | VND.ID = STU.ID |
| WEB | STU | WEB.SC = STU.SC AND WEB.SN = STU.SN |
| WEB | LOC | WEB.SC = LOC.CD |
| WGM | LOC | WGM.SC = LOC.CD |
| WIA | STU | WIA.ID = STU.ID |
| WIG | STU | WIG.ID = STU.ID |
| WIG | LOC | WIG.SC = LOC.CD |
| WIH | STU | WIH.ID = STU.ID |
| WPT | STU | WPT.ID = STU.ID |
| XRF | LOC | XRF.SC = LOC.CD |
| YTD | MST | YTD.SC = MST.SC AND YTD.SE = MST.SE |
| YTD | TCH | YTD.SC = TCH.SC AND YTD.TN = TCH.TN |
| YTD | LOC | YTD.SC = LOC.CD |
| ZFS | LOC | ZFS.SC = LOC.CD |
