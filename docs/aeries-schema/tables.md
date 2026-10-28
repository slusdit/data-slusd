# Aeries tables (DST26000SanLeandroUSD, generated 2026-10-28)

600 base tables, 146 views. Row counts are from the catalog (approximate). Empty tables are listed but unused in this district.

| Table | Rows | Key | Description |
|---|---:|---|---|
| [ABS](tables/ABS.md) | 580 | SC, CD | Absence code definitions per school. Decodes ATT.AL and ATT.A0..A9. |
| [ACA](tables/ACA.md) | 51 | SC, SN, PSQ, ASQ | Stores the linking of Alternate Course Requests |
| [ACL](tables/ACL.md) | 0 | SC, DT | Maintains a log of when and where new PAC files and DAC tables are created |
| [ACR](tables/ACR.md) | 4,565 | SC, SN, SQ | Stores Alternate Course Requests |
| [ACT](tables/ACT.md) | 2,467 | PID, SQ | Recording Activities in which student participates, and Awards received by student |
| [ADH](tables/ADH.md) | 15,392 | ID, SQ | Stores a history of student address changes |
| [ADR](tables/ADR.md) | 44 | SC, ID | For recording Names and Addresses of Staff, Site Council, PTA, etc. |
| [ADS](tables/ADS.md) | 120,473 | PID, SQ | Discipline incidents (assertive discipline), one row per incident per student. |
| [AED](tables/AED.md) | 0 | ID | Stores Adult Education data |
| [AEF](tables/AEF.md) | 0 | ID, FC, VL | Stores Adult Education data |
| [AHC](tables/AHC.md) | 4,759 | CD, YR, SCL | Stores a history of absence code descriptions |
| [AHD](tables/AHD.md) | 777,550 | ID, CD, YR, SCL | Stores a detailed history of student attendance counts by code, period and year |
| [AHS](tables/AHS.md) | 141,869 | ID, YR, SCL, SP, HS | Attendance history summary per student per year: enrolled, present, absent, tardy counts. |
| [AINV](tables/AINV.md) | 1,023 | ID, SQ |  |
| [ANA](tables/ANA.md) | 9 | NID, CD | Stores Attendance Notification Codes. |
| [ANC](tables/ANC.md) | 7 | NID | Stores Attendance Notification Configuration. |
| [ANL](tables/ANL.md) | 57,287 | NID, SC, SN, ID, DT | Stores Attendance Notification Log. |
| [ANS](tables/ANS.md) | 20 | NID, SCL | Stores Attendance Notification Schools. |
| [APC](tables/APC.md) | 18 | PID, SQ | Stores a student's current academic plan |
| [APL](tables/APL.md) | 20 | PID, SQ | Maintains a record of any change done to a student's academic plan. |
| [ARB](tables/ARB.md) | 0 | ID |  |
| [ARC](tables/ARC.md) | 0 | UID | Stores At-Risk Indicator information |
| [ARD](tables/ARD.md) | 0 |  | Student Attendance details for TX Attendance Reporting |
| [ARH](tables/ARH.md) | 0 |  | Student Hourly CTE details for TX Attendance Reporting |
| [ARI](tables/ARI.md) | 0 | ID, SQ | Stores Student At-Risk Indicators |
| [ARP](tables/ARP.md) | 0 | SC, TR, RP | Attendance Reporting Periods for use in Texas |
| [ARR](tables/ARR.md) | 0 |  | Student Remote attendance details for TX Attendance Reporting |
| [ARS](tables/ARS.md) | 0 |  | Campus/District Summary details for TX Attendance Reporting |
| [ART](tables/ART.md) | 0 | SC, TR | Records instructional ranges (Instructional Periods or Instructional Minutes) for use in calculating Instructional Minutes in Texas schools. |
| [ASL](tables/ASL.md) | 22,627 | SC, TN, DT | Maintains a record when teachers submit attendance through Teacher Portal - Generates Missing Sheet Log |
| [ATA](tables/ATA.md) | 975 | ID, SQ | Relationships of Student Numbers to Supplemental Attendance Session numbers |
| [ATC](tables/ATC.md) | 432 | SC, SE, DT | Days that a Supplemental Attendance Session meets |
| [ATD](tables/ATD.md) | 4,895 | ID, SQ | Supplemental Attendance tracking includes times in and out and total minutes by student |
| [ATL](tables/ATL.md) | 366,168 | SC, SN, SQ | Maintains a record of when changes are made to student attendance |
| [ATN](tables/ATN.md) | 47,902 | SC, SN, SQ | For recording specific details for a particular student and date. |
| [ATP](tables/ATP.md) | 45 | PR | Contains details of Supplemental Attendance Programs offered |
| [ATR](tables/ATR.md) | 47 | SC, SE, ID | Relationships of Staff IDs to Supplemental Attendance Session numbers |
| [ATS](tables/ATS.md) | 106 | SC, SE | Contains details of Supplemental Attendance Sessions offered |
| [ATT](tables/ATT.md) | 103,687 | SC, SN, DY | Daily attendance marks, one row per student per day that has at least one mark. No row = present all day. |
| [AUT](tables/AUT.md) | 434,996 | PID, SQ | Specific authorizations or prohibitions to student participation in specific programs |
| [AWL](tables/AWL.md) | 0 | SCL, SE, ID | Master Schedule Wait List |
| [BAA](tables/BAA.md) | 6,820 | SEQ, SC, SN, PSQ, ASQ | Alternate Course Request Association Backup |
| [BAC](tables/BAC.md) | 54,387 | SEQ, SC, SN, SQ | Alternate Course Requests Backup |
| [BEL](tables/BEL.md) | 795 | SC, DY, PD | Bell Schedule for Secondary Schools, including Continuation or Alternative Schools |
| [BER](tables/BER.md) | 154 | ID, SQ | Tracks Mechanical Restraint, Physical Restraint, and Seclusion for State Reporting and Civil Rights Data Collection. |
| [BGV](tables/BGV.md) | 1,950,270 | ID, SCL, SQ, GTY | Stores course and data used to calculate Built-In GPAs. |
| [BIL](tables/BIL.md) | 0 | SC, TN | For tuition billing of students – more detailed than the FEE table |
| [BPW](tables/BPW.md) | 0 | RID | Stores Banned Passwords |
| [BSA](tables/BSA.md) | 0 | SEQ, ID, SSC, PSQ, ASQ | Summer Alternate Course Request Association Backup |
| [BSD](tables/BSD.md) | 19 | SC, KY | Provides for a variety of Bell Schedules which can be assigned to the Calendar |
| [BST](tables/BST.md) | 149 | SC, KY, PD, PS | Contains data from Bell Scheduler |
| [BWL](tables/BWL.md) | 0 | SEQ, SCL, SE, ID | Backup Scheduling Wait List |
| [CAC](tables/CAC.md) | 0 | CID, SC, TY, AID | Campaign Advertisement Connections |
| [CAL](tables/CAL.md) | 0 | ID, SCL, SQ | Class Attendance Log for use with Flex Scheduling |
| [CAR](tables/CAR.md) | 38,131 | SC, SN, SQ | Course attendance / schedule change history: when students entered and left sections, used for class-level attendance. |
| [CAS](tables/CAS.md) | 0 | SC, SE, DT | Class Attendance Submission Log for use with Flex Scheduling |
| [CAT](tables/CAT.md) | 0 | ID, SCL, SE, DT, SQ | Class Attendance for use with Flex Scheduling |
| [CBD](tables/CBD.md) | 0 | ID, BID, CSQ, OC, MD | District Attendance Letter Details |
| [CBS](tables/CBS.md) | 0 | BID | District Attendance Letter Summary |
| [CCC](tables/CCC.md) | 18 | SC, ID, CN, FSY, LSY | College Course Credit |
| [CCD](tables/CCD.md) | 2,880 | CSQ, DT | Class Calendar dates for Flex Scheduling |
| [CCH](tables/CCH.md) | 0 | CN, CD | Allows districts to define a course in more granular detail. |
| [CCI](tables/CCI.md) | 7,074 | ID | College and Career Indicator |
| [CCL](tables/CCL.md) | 31 | SQ | Class Calendars for Flex Scheduling |
| [CCP](tables/CCP.md) | 72 | SC, CN, CD | Stores Career Pathways specific to each Course. |
| [CDC](tables/CDC.md) | 2 | CN, SQ | Aeries Web only. Contains documents specific to each Course. |
| [CDI](tables/CDI.md) | 0 | SC, TC, FC, CD | Code Table Image |
| [CER](tables/CER.md) | 111,328 | ID, SA | Stores College Entrance Requirements for each student. |
| [CHC](tables/CHC.md) | 0 | PID, HSQ, CD | Allows removal/addition Course Characteristics to a specific transcript record. |
| [CHD](tables/CHD.md) | 0 | ID, CD, YR, SCL, FSQ | Attendance History Details for Flex Scheduling |
| [CHI](tables/CHI.md) | 1,380 | SCH | Names / Addresses of Districts & Schools outside the current district used by various drop-downs, such as Transcripts |
| [CINV](tables/CINV.md) | 11,542 | ID, SQ |  |
| [CMP](tables/CMP.md) | 0 | CN, CC | Composite Courses |
| [CNF](tables/CNF.md) | 59,123 | PID, SQ | Counseling conference log (detailed). |
| [COD](tables/COD.md) | 5,334 | SC, TC, FC, CD | Code definitions for coded columns in many tables. |
| [COL](tables/COL.md) | 452 | ID | Names and Addresses of Colleges – Can be DISTRICT MANAGED. |
| [CON](tables/CON.md) | 105,510 | PID, SQ | Emergency / parent contacts per student. |
| [CPE](tables/CPE.md) | 0 | ID, CD, SQ | Stores Career Pathways Experiences for each student. |
| [CPH](tables/CPH.md) | 11,561 | ID, CD, SQ | Stores Career Pathways History for each student. |
| [CPO](tables/CPO.md) | 1 | ID, CD, SQ | Stores Career Pathways Outcomes for each student. |
| [CPR](tables/CPR.md) | 0 | CN, RID, CNR | This table is in the Aeries SQL database for a planned future enhancement to Aeries to implement Course Requests |
| [CPW](tables/CPW.md) | 10,041 | ID, CD | Stores Career Pathways details for each student. |
| [CRA](tables/CRA.md) | 11 | RID, UID | Contains which security groups can view each custom report. |
| [CRC](tables/CRC.md) | 4 | ID | Stores the definition of each custom report. |
| [CRD](tables/CRD.md) | 30 | SC, CD | Contains codes used to setup course request packets |
| [CRF](tables/CRF.md) | 0 | CN, SQ | Aeries Web only. Contains fee information specific to each Course. |
| [CRG](tables/CRG.md) | 11 | RID, IID | Stores which custom report items are on each custom report. |
| [CRI](tables/CRI.md) | 13 | ID | Stores the definition of each custom report item. |
| [CRL](tables/CRL.md) | 0 | ID | Contains descriptions and colors for each of the 5 test levels. |
| [CRP](tables/CRP.md) | 143 | SC, CD, CSQ | Contains the courses setup within the course request packets |
| [CRQ](tables/CRQ.md) | 0 | SC, GR, SA, CN | Contains the list of courses offered to students in different grade levels during scheduling |
| [CRS](tables/CRS.md) | 1,792 | CN | Course catalogue (district-wide): one row per course number. |
| [CRT](tables/CRT.md) | 2 | PID, CN | Stores transcript requests from Colleges |
| [CRUB](tables/CRUB.md) | 23 | ID, SQ |  |
| [CSA](tables/CSA.md) | 0 | ID, SQ | Special Ed Alternate Assessment Data – Can be DISTRICT MANAGED |
| [CSD](tables/CSD.md) | 0 | ID, SQ | Special Ed Disability Services – Can be DISTRICT MANAGED |
| [CSE](tables/CSE.md) | 1,612 | ID | Special education record per student (district managed). |
| [CSH](tables/CSH.md) | 0 | ID, SQ |  |
| [CSI](tables/CSI.md) | 0 | ID, SQ | Special Ed Infant Services data – Can be DISTRICT MANAGED |
| [CSN](tables/CSN.md) | 557 | ID, PT | Contains descriptions of Content Standards Tests and Test Parts populated when loading STAR – Can be DISTRICT MANAGED |
| [CSQ](tables/CSQ.md) | 0 | SQ, SC | Academic Plan - Course Sequences |
| [CSS](tables/CSS.md) | 0 | ID, SQ | Special Ed Student Suspensions – Can be DISTRICT MANAGED |
| [CST](tables/CST.md) | 466,328 | PID, ID, PT, TA, RT, RP | Stores the Content Standard Scores that are loaded from STAR |
| [CSV](tables/CSV.md) | 3,533 | ID, SQ | Special Ed Student Services data – Can be DISTRICT MANAGED |
| [CSX](tables/CSX.md) | 0 | ID, AMD | Special Ed Secondary Transition data - reported by TX districts for SPPI-13 dataset in the SPEDS summer submission. |
| [CTD](tables/CTD.md) | 8 | TC | Defines the layout of custom tables defined in the Aeries SQL database and tells Aeries Web how to display and work with the table. Updated from the Define Custom Tables page |
| [CTE](tables/CTE.md) | 2,076 | ID, SQ | Career Technical Education, used by CALPADS. The information in this table is visible from the Students form, Student Secondary Data tab |
| [CTF](tables/CTF.md) | 77 | TC, FC | Defines the layout of custom tables defined in the Aeries SQL database and tells Aeries Web how to display and work with the table. Updated from the Define Custom Tables page |
| [CTI](tables/CTI.md) | 0 | ID, TY, SEQ |  |
| [CTL](tables/CTL.md) | 436 | ID, PT | Test and test-part definitions (decodes TST.ID / TST.PT). |
| [CTS](tables/CTS.md) | 12,483 | PID, DT, NM, ST1 | Test Scores to be included on College Transcripts |
| [CVR](tables/CVR.md) | 0 | ID, PT, TN, TX, RN, RS | Civil Rights Data |
| [CVT](tables/CVT.md) | 0 | TN, TX, RN, RS | Civil Rights Data Totals |
| [DAA](tables/DAA.md) | 0 | NID | Alert and Responses Sent and Received |
| [DAC](tables/DAC.md) | 0 | SC, WK, SH, LI | Created by Daily Attendance when Sheets are created |
| [DAG](tables/DAG.md) | 329 | AID, LVL | Aeries Web Only. Define sub groups for district analysis indicators |
| [DAI](tables/DAI.md) | 212 | AID | Aeries Web Only. Stores Analysis Indicator Definitions for Aeries Analytics |
| [DAL](tables/DAL.md) | 38 | CD | Aeries Web Only. Table stores the titles, codes, and colors for each of the rubric levels |
| [DAM](tables/DAM.md) | 0 | NID, CL | Content of Alert Sent and User initiating the Request |
| [DAQ](tables/DAQ.md) | 9,962,659 | ID, SQ | Aeries Web Only. Stores the qualifying level of each student for each Aeries Analytics Analysis Item |
| [DAS](tables/DAS.md) | 12,912 | AID, SCL, GR | Aeries Web Only. Stores a summary of student level qualifications to different Aeries Analytics Analysis Items by school and grade |
| [DAT](tables/DAT.md) | 250 | AID, SCL, GR | Aeries Web Only. Stores the low and high values for each Rubric level |
| [DAU](tables/DAU.md) | 0 | NID, RID, RTY | Alert Recipients, Responding User and Status of Response - Read, Unread, etc. |
| [DAY](tables/DAY.md) | 6,160 | SC, DY | School calendar, one row per calendar day per school. HO = '' marks an instructional day. |
| [DCA](tables/DCA.md) | 130 | DID, VID, CL | Document Archive |
| [DCL](tables/DCL.md) | 96,875 | SC, SN, SQ | Table used by Parent Data Confirmation to store a log of parent access to each document and records if they digitally confirmed the information in the document |
| [DCS](tables/DCS.md) | 15 | DID, CL | Table used by Parent Data Confirmation to store the basic info about each Document and the document itself |
| [DCV](tables/DCV.md) | 5 | DID | Table used by Parent Data Confirmation to store the Schools and Grades each document is visible to |
| [DDR](tables/DDR.md) | 0 | ID | Discount Rates |
| [DDS](tables/DDS.md) | 0 | ID, CDS | District Data Sharing |
| [DGG](tables/DGG.md) | 0 | WF, MK | Stores grade points for weight factors added to District Defined GPAs. |
| [DGP](tables/DGP.md) | 0 | GID | Stores District Defined GPAs. |
| [DGS](tables/DGS.md) | 0 | GID, SCL, CHT | Stores Schools and Cohorts associated with each District Defined GPA |
| [DGT](tables/DGT.md) | 0 | GID, SA |  |
| [DGV](tables/DGV.md) | 0 | ID, SCL, SQ, GID, SA | Stores course and data used to calculate each active District GPA. |
| [DGW](tables/DGW.md) | 0 | WF | Stores weight factors added to District Defined GPAs |
| [DHS](tables/DHS.md) | 0 | ID, SQ |  |
| [DIG](tables/DIG.md) | 119 | IID, DID | Aeries Web Only. Aeries Analytics Dashboard – stores which dashboard items are on each dashboard |
| [DIO](tables/DIO.md) | 146 | IID | Aeries Web Only. Aeries Analytics Dashboard – stores the definition of each dashboard item |
| [DIP](tables/DIP.md) | 37 | IID, UID | Aeries Web Only. Table for Dashboard Item Push Sharing |
| [DIS](tables/DIS.md) | 4,122 | PID, SQ | Contains data for one of the two Discipline Tables – Less detail than ADS (both can be used) |
| [DistrictCache](tables/DistrictCache.md) | 3 | NM |  |
| [DIT](tables/DIT.md) | 0 | ID |  |
| [DLH](tables/DLH.md) | 0 | ID, SQ | Contains multi-year data for student participation in Dual Language Immersion programs |
| [DNT](tables/DNT.md) | 10,065 | PID, SQ | Contains history of details for Dental testing |
| [DOC](tables/DOC.md) | 36,214 | ID, SQ | Stores any type of documentation. The table is ID based and it is not cached because of its potential big size |
| [DOF](tables/DOF.md) | 0 | OID, IID | Digital Offering |
| [DPS](tables/DPS.md) | 0 | CD |  |
| [DPT](tables/DPT.md) | 596 | NM | Stores various District Wide options and is used by various Reports and Forms |
| [DRA](tables/DRA.md) | 112 | RID, RIN, SQ | Aeries Web Only. Contains all of the individual district resource assignments (who they're checked out to) |
| [DRC](tables/DRC.md) | 0 | RID, CN | Aeries Web Only. Contains information about courses each district resources applies to |
| [DRI](tables/DRI.md) | 66 | RID, RIN | Aeries Web Only. Contains all of the individual district resource copies |
| [DRT](tables/DRT.md) | 2 | RID | Aeries Web Only. Contains information about district resources including title and other basic information |
| [DSD](tables/DSD.md) | 3,272 | ID | District supplemental student fields (column meanings are district-specific; see extended properties). |
| [DSP](tables/DSP.md) | 145,910 | PID, SQ, SQ1 | Dispositions (consequences) for discipline incidents; several per ADS row. |
| [DVC](tables/DVC.md) | 249 | GID, SCL | Data Validation Schools |
| [DVD](tables/DVD.md) | 45 | VID | Data Validation Definitions |
| [DVG](tables/DVG.md) | 14 | GID | Data Validation Groups |
| [DVR](tables/DVR.md) | 114,357 | SQ | Data Validation Results |
| [DVS](tables/DVS.md) | 1,642 | ID, USR |  |
| [DVU](tables/DVU.md) | 6 | GID, UID | Data Validation Users |
| [ECA](tables/ECA.md) | 0 | ID | Stores data to track Extracurricular Activity eligibility and participation |
| [ECD](tables/ECD.md) | 0 | ID, SQ | Early Childhood Development |
| [ECO](tables/ECO.md) | 0 | ID, SD | Special Ed Preschool Outcomes data - reported by TX districts for SPPI-7 dataset in the SPEDS summer submission. |
| [ECP](tables/ECP.md) | 0 | ID, SQ | Stores data to track Extracurricular Activity Probations |
| [EdFiTransactionErrors](tables/EdFiTransactionErrors.md) | 0 | TID, PK |  |
| [EFB](tables/EFB.md) | 0 | BID |  |
| [EFC](tables/EFC.md) | 0 | CID, RID |  |
| [EFCD](tables/EFCD.md) | 0 | CID, RID, DID |  |
| [EFD](tables/EFD.md) | 0 | CID, EN, PK | Ed-Fi Data |
| [EFE](tables/EFE.md) | 0 | CID, EC | Ed-Fi Entities |
| [EFF](tables/EFF.md) | 0 | JID, PKID |  |
| [EFJ](tables/EFJ.md) | 0 | JID |  |
| [EFJE](tables/EFJE.md) | 0 | EID |  |
| [EFO](tables/EFO.md) | 1 | CID | Ed-Fi Organization |
| [EFR](tables/EFR.md) | 0 | TID | Ed-Fi Results |
| [EFS](tables/EFS.md) | 0 | CID, SC | Ed-Fi Schools |
| [EFSD](tables/EFSD.md) | 0 | CID |  |
| [EFT](tables/EFT.md) | 0 | JID, PKID |  |
| [ELO](tables/ELO.md) | 0 | SC, TY, CD |  |
| [EML](tables/EML.md) | 48,165 | EID | Used to log the emails that are sent out of the Aeries system |
| [EMP](tables/EMP.md) | 1,348 | CD | Contains information concerning Employers for Student Work Permits – Can be DISTRICT MANAGED |
| [EMU](tables/EMU.md) | 0 | EM, CT | Used to store how parents in ABI have configured their email address to be used |
| [ENH](tables/ENH.md) | 0 | CD, SA | Contains Estimated New Hires information, used for state reporting |
| [ENR](tables/ENR.md) | 281,607 | ID, YR, SC, SN, ED | Enrollment history by Permanent ID: one row per student per school per enrollment spell, across years. |
| [EPK](tables/EPK.md) | 0 | PKID |  |
| [EPL](tables/EPL.md) | 0 | EID, SID, LVL | Aeries Web Only. Define performance levels for each exam section |
| [ERL](tables/ERL.md) | 375 | ID, SQ | Electronic Score Report Log |
| [ERR](tables/ERR.md) | 34,428 | GUID |  |
| [ESD](tables/ESD.md) | 0 | ID, TY, CD |  |
| [ESI](tables/ESI.md) | 2,683 | TY, ID, SCL, VNM | Stores identifying fields from 3rd party products such as Google (G Suite). |
| [ESN](tables/ESN.md) | 0 | EID, SID | Aeries Web Only. Define sections of an exam, exam section can be tied to test part |
| [ESQ](tables/ESQ.md) | 0 | EID, SID, QID | Aeries Web Only. Store exam questions that belong to an exam section |
| [ESR](tables/ESR.md) | 0 | EID, QID, RN | Contains grading rules for each exam question. |
| [ETA](tables/ETA.md) | 0 | EID, TA | Aeries Web Only. Define Testing Administrations of an exam. |
| [ETS](tables/ETS.md) | 0 | EID, TA, ID | Aeries Web Only. Store a snapshot of students along with their classes and teachers in an Exam Testing Admin. |
| [ETS_Accommodation](tables/ETS_Accommodation.md) | 158 | ID |  |
| [ETS_Accommodation_Test](tables/ETS_Accommodation_Test.md) | 808 |  |  |
| [ETS_Test](tables/ETS_Test.md) | 12 | ID |  |
| [EVT](tables/EVT.md) | 28 | EID | Stores the contents of the Event Calendar. |
| [EXA](tables/EXA.md) | 0 | ID, EID, SQ, QID | Aeries Web Only. Aeries Analytics Table for Exam Response Answers. |
| [EXC](tables/EXC.md) | 0 | EID, QID, SQ | Aeries Web Only. Aeries Analytics Table for Exam Question Choices. |
| [EXG](tables/EXG.md) | 0 | TID, GID | Aeries Web Only. Aeries Analytics Table for Exam Passage Text Groups. |
| [EXH](tables/EXH.md) | 0 | EID, SC | Aeries Web Only. Define which schools an exam can be given at. |
| [EXL](tables/EXL.md) | 0 | SC, EID, DT | Aeries Web Only. Aeries Analytics Table for Exam Printing Log. |
| [EXM](tables/EXM.md) | 0 | EID | Aeries Web Only. Aeries Analytics Table for Exams. |
| [EXO](tables/EXO.md) | 0 | FID | Aeries Web Only. Store folder structure of exams. |
| [EXP](tables/EXP.md) | 1,135 | PID, SQ | Stores details for student expulsions. |
| [EXQ](tables/EXQ.md) | 0 | EID, QID | Aeries Web Only. Aeries Analytics Table for Exam Questions. |
| [EXR](tables/EXR.md) | 0 | ID, EID, SQ | Aeries Web Only. Aeries Analytics Table for Exam Responses. |
| [EXS](tables/EXS.md) | 0 | EID, QID, SD | Aeries Web Only. Aeries Analytics Table for Exam Question Standards. |
| [EXT](tables/EXT.md) | 0 | TID | Aeries Web Only. Aeries Analytics Table for Exam Passage Text. |
| [EXV](tables/EXV.md) | 0 | EID, QID, VN | Aeries Web Only. Aeries Analytics Table for Exam Versions. |
| [FAP](tables/FAP.md) | 2,706 | ID, SQ, SQ1 | Contains the accommodations that each 504 student needs. |
| [FBK](tables/FBK.md) | 51 | CID | Feedback |
| [FDE](tables/FDE.md) | 1,559 | ID, SQ, SQ1 | Contains effects of the disabilities for 504 plans. |
| [FEC](tables/FEC.md) | 625 | ID, SQ, SQ1 | Contains evaluation criteria for each 504 plan. |
| [FEE](tables/FEE.md) | 584 | PID, SQ | Contains records of Fees charged to and collected from Students |
| [FFC](tables/FFC.md) | 0 | AT, VL |  |
| [FLF](tables/FLF.md) | 40 | ID | Contains definitions of field length files used by the Import Fixed Length Files form - Can be DISTRICT MANAGED. |
| [FLG](tables/FLG.md) | 25,494 | PID, TC | Stores the student number and specific table name flagged with a red flag indicator. |
| [FLI](tables/FLI.md) | 1,173 | GUID | File Location Information for use with the CALPADS Extracts page in Aeries Web. |
| [FLR](tables/FLR.md) | 2,660 | ID, FC | Contains definitions of field length record used by the Import Fixed Length Files form - Can be DISTRICT MANAGED. |
| [FOF](tables/FOF.md) | 752 | ID, SQ | Contains the details of each 504 plan. |
| [FPP](tables/FPP.md) | 1,521 | ID, SQ, SQ1 | Contains the basic info of individuals who participate in the 504 plan. |
| [FPS](tables/FPS.md) | 0 | ID, SQ | Aeries Web Only. Contains Payment Schedules for each student. |
| [FRE](tables/FRE.md) | 75,637 | ID, SQ | Free / reduced meal application status per student. |
| [FRE_HIST](tables/FRE_HIST.md) | 189 |  |  |
| [FSA](tables/FSA.md) | 0 | ID, RID | Foster Action Plans |
| [FSC](tables/FSC.md) | 0 | ID, RID | Foster Legal Cases |
| [FSD](tables/FSD.md) | 549 | ID, SQ, SQ1 | Contains student disabilities for each 504 plan. |
| [FSE](tables/FSE.md) | 0 | ID, RID | Foster Education Rights Holder |
| [FSG](tables/FSG.md) | 0 | ID, RID, GID | Foster Goals |
| [FSH](tables/FSH.md) | 0 | ID, RID | Foster history |
| [FSI](tables/FSI.md) | 0 | ID | Foster Student Information |
| [FSL](tables/FSL.md) | 0 | ID, RID | Foster Attorneys |
| [FSM](tables/FSM.md) | 0 | ID, RID | Foster Meetings |
| [FSN](tables/FSN.md) | 0 | ID, RID | Foster Notes |
| [FSP](tables/FSP.md) | 0 | ID, RID | Foster Placements |
| [FSR](tables/FSR.md) | 0 | ID, RID | Foster Hearings |
| [FSS](tables/FSS.md) | 0 | ID, RID | Foster Team Contacts |
| [FST](tables/FST.md) | 0 | ID, RID | Foster Summary Report Notes |
| [FTD](tables/FTD.md) | 0 | TID | Aeries Web Only. Contains record of credits and debits for each student. |
| [FTF](tables/FTF.md) | 0 | SQ | Flex Periods used for Flex Scheduling |
| [FTP](tables/FTP.md) | 0 | PID, CID |  |
| [FTS](tables/FTS.md) | 3 | ID | Aeries Web Only. Contains the current financial transaction summary for each student. |
| [FTT](tables/FTT.md) | 0 | SQ | Flex Period Times used for special bell schedules in Flex Scheduling |
| [GAL](tables/GAL.md) | 14,186 | UID |  |
| [GBA](tables/GBA.md) | 22,098 | GN, AN | Gradebook assignments. |
| [GBB](tables/GBB.md) | 25,260 | BID | Stores information about the Gradebook backups that are done |
| [GBC](tables/GBC.md) | 33 | CID | Types of Grading Scales used by each teacher, associated with individual Gradebook Assignments so letter or character grades can be given instead of numeric values |
| [GBD](tables/GBD.md) | 340 | SC, SN, GN, AN, SD | Stores the gradebook scores by standard for each assignment |
| [GBE](tables/GBE.md) | 1,529 | SC, GN, SE | Stores the Section or Teacher Numbers associated with an individual gradebook |
| [GBF](tables/GBF.md) | 77 | FID, GN, AN | Store gradebook assignment's file linking information. |
| [GBK](tables/GBK.md) | 1,384 | GN | Teacher gradebooks. |
| [GBL](tables/GBL.md) | 0 | SQ | Log used to track parents and/or students who view a teacher's gradebook via Parent Portal |
| [GBM](tables/GBM.md) | 322 | CID, MK | Stores actual Marks used by each Gradebook Grading Scale in the GBC table. |
| [GBN](tables/GBN.md) | 5,613 | GN, AN, SD | Stores standards associated with each gradebook assignment. Used for the Load process from the Gradebook to Standards-Based Grade Reporting. |
| [GBO](tables/GBO.md) | 50,176 | SC, ID, OPN | Sets options for Teacher Grades |
| [GBR](tables/GBR.md) | 2,202 | GN, CD | Stores terms associated with each gradebook. |
| [GBS](tables/GBS.md) | 555,798 | SC, SN, GN, AN | Gradebook scores per student per assignment. |
| [GBT](tables/GBT.md) | 4,087 | GN, AT | Contains definitions of the various assignment types by teachers |
| [GBU](tables/GBU.md) | 35,981 | SC, GN, SN | Stores the information for students the teacher has allowed into the gradebook |
| [GBV](tables/GBV.md) | 56,988 | SC, SN, GN, CD | Stores student overall grade by term. |
| [GCC](tables/GCC.md) | 0 | UID |  |
| [GCM](tables/GCM.md) | 4 | MK | Contains custom marks used with Gradebook |
| [GEA](tables/GEA.md) | 0 | EPI, RN | Stores requirements for an Endorsement |
| [GEC](tables/GEC.md) | 0 | EPI, RN, OID, ECR | Stores available courses per Endorsement Option |
| [GEO](tables/GEO.md) | 0 | EPI, RN, OID | Stores available options per Endorsement Requirement |
| [GEP](tables/GEP.md) | 0 | EPI | Stores pathways a student can take to achieve the Endorsements |
| [GES](tables/GES.md) | 0 | ID, EC | Stores Student Endorsement Statuses |
| [GPA](tables/GPA.md) | 0 | ID, SCL, GID | Stores student GPAs generated by District Defined GPAs. |
| [GPC](tables/GPC.md) | 0 | SC, GP1, GP2 | Stores definition of weighted grading |
| [GPD](tables/GPD.md) | 0 | SC, GP | Stores school defined data ranges for each marking period |
| [GPS](tables/GPS.md) | 0 | SC, SN, GN, GP |  |
| [GRC](tables/GRC.md) | 595 | SC, MK | Valid marks and their grade points / credit rules (decodes GRD.M*, HIS.MK). |
| [GRD](tables/GRD.md) | 29,112 | SC, SN, PD, CN, TN, SE | Current-year grade reporting marks, one row per student per section. |
| [GRG](tables/GRG.md) | 102,272 | PID, YR, SCL | Stores students Grade Reporting GPA data as calculated on recompute |
| [GRH](tables/GRH.md) | 44,815 | SC, SN, PD, CN, TN, SE, WM | History of grade reporting marks for earlier windows in the current year (snapshot per window). |
| [GRO](tables/GRO.md) | 146 | SC, NM, TY | Contains school and user options dealing with Grade Reporting |
| [GRP](tables/GRP.md) | 21 | SC, KY | Contains the mark headings and descriptions to be printed on a report card and any messages |
| [GRS](tables/GRS.md) | 0 | SC, SN, PD, CN, TN, SE, SD | Contains Standards Based Grades given to Secondary Students |
| [GSS](tables/GSS.md) | 0 | ID, SCL, SE, GP | Contains Gradebook overall grade information for a point in time. |
| [GTC](tables/GTC.md) | 0 | ID, RSQ, SQ | Stores student characteristics that triggered a particular GATE Referral. |
| [GTE](tables/GTE.md) | 1,909 | ID | Stores main GATE information about a student. |
| [GTG](tables/GTG.md) | 30,376 | GN, MK, TY | Defines percent range for each mark for Gradebook to Grades for Report Cards |
| [GTN](tables/GTN.md) | 0 | ID, RSQ, SQ | Stores various notes about a GATE Referral. |
| [GTR](tables/GTR.md) | 0 | ID, SQ | Stores information about each referral to the GATE program that has been made for a student. |
| [GTS](tables/GTS.md) | 9 | SC, SN, GN, CA, TY | Stores the default grade that a student earned from the previous teacher. |
| [GTT](tables/GTT.md) | 0 | ID, SQ | Stores information about tests administered to students pending GATE qualification. |
| [HAM](tables/HAM.md) | 0 | ID, SQ |  |
| [HIS](tables/HIS.md) | 1,066,581 | PID, SQ | Course history / transcript: every course and mark a student has ever earned, including other schools. |
| [his_20260817](tables/his_20260817.md) | 1,060,886 |  |  |
| [his_20261015](tables/his_20261015.md) | 1,056,716 |  |  |
| [HIS_backup_20260807](tables/HIS_backup_20260807.md) | 1,060,401 |  |  |
| [HIS_backup_20260929_0212](tables/HIS_backup_20260929_0212.md) | 1,062,168 |  |  |
| [HRN](tables/HRN.md) | 40,689 | PID, SQ | Contains history of details of Hearing Tests |
| [HSE](tables/HSE.md) | 0 | PID, SQ | Contains records of Healthy Start Program Services Rendered |
| [HSG](tables/HSG.md) | 287,669 | ID, GRT, CD |  |
| [HWO](tables/HWO.md) | 1,180 | PID, SQ | Contains history of details of Height and Weight of Student |
| [ICL](tables/ICL.md) | 186,536 | SC, SN, SQ | Table used by Parent Data Confirmation to store what and when data is confirmed by the parent. |
| [IdentityProvider](tables/IdentityProvider.md) | 2 | Id |  |
| [IDN](tables/IDN.md) | 49,886 | ID | District-wide student identity record, one row per Permanent ID. |
| [IMB](tables/IMB.md) | 165 | ID, SQ | Stores student immunizations boosters (COVID-19) |
| [IMC](tables/IMC.md) | 0 | SC, SE, TN, DT | Used for weekly Teacher certification of instructional minutes |
| [IMJ](tables/IMJ.md) | 66 | GUID |  |
| [IMM](tables/IMM.md) | 32,041 | PID | Immunization history. |
| [IMR](tables/IMR.md) | 445,439 | GUID, SQ |  |
| [IMS](tables/IMS.md) | 2 | TBL, NM |  |
| [INA](tables/INA.md) | 1 | PID, SQ, SQ1 | Stores Actions for each Intervention Goal |
| [INC](tables/INC.md) | 54 | PID, SQ, SQ1 | Contains detailed information on the progress the student is making towards the established goals |
| [ING](tables/ING.md) | 43 | PID, SQ, SQ1 | Contains details regarding the intervention goals set for a student |
| [INM](tables/INM.md) | 128 | PID, SQ, SQ1 | Contains meeting information (comments, attendees, etc.) regarding the student intervention |
| [INP](tables/INP.md) | 13 | PID, SQ, SQ1 | Contains instructional practices or strategies defined for the student and intervention |
| [INR](tables/INR.md) | 31 | PID, SQ, SQ1 | Stores Resources for each Intervention. |
| [INS](tables/INS.md) | 18 | PID, SQ, SQ1 | Stores Stakeholders for each Intervention. |
| [INV](tables/INV.md) | 68,832 | PID, SQ | Contains details of Intervention Actions taken |
| [IPI](tables/IPI.md) | 100 | PID, SQ, SQ1 | Stores Prior Interventions for each Intervention. |
| [IPR](tables/IPR.md) | 0 | CD, SQ | Stores the programs that the district offers. (CSIS use ONLY). - Can be DISTRICT MANAGED. |
| [IRC](tables/IRC.md) | 61 | PID, SQ, SQ1 | Stores Reasons and Concerns for each Intervention. |
| [ISA](tables/ISA.md) | 0 | ID, SQ | Stores Independent Study Agreement records for a student. |
| [ISG](tables/ISG.md) | 0 | ID, SQ, SQ1 | Stores Independent Study Agreement signatures for agreements. |
| [ISP](tables/ISP.md) | 102 | ID, SQ | Stores product work hours for Independent Study agreements. |
| [ISS](tables/ISS.md) | 23 | PID, SQ, SQ1 | Stores Student Strengths for each Intervention. |
| [ISW](tables/ISW.md) | 0 | ID, SQ, SQ1 | Independent Study Production Work Hours |
| [IVS](tables/IVS.md) | 0 | ID, SQ, SQ1 | Internship Visits |
| [LAA](tables/LAA.md) | 0 | ID, SQ |  |
| [LAC](tables/LAC.md) | 43,783 | ID | English learner / language assessment record per student. |
| [LAF](tables/LAF.md) | 333 | ID, SQ | Contains a test history of Oral Language Assessments test taken by the student – Can be DISTRICT MANAGED. |
| [LAS](tables/LAS.md) | 1,579 | ID, SQ | Contains a test history of Language Assessments test taken by the student – Can be DISTRICT MANAGED. |
| [LAV](tables/LAV.md) | 0 | ID, SQ |  |
| [LCN](tables/LCN.md) | 170 | SC, CD | School Contacts |
| [LEA](tables/LEA.md) | 953,753 | PID, ID, PT, LD, DY | Stores Attendance data relating to a student's Letter |
| [LEC](tables/LEC.md) | 1,196 | SC, ID, CD | Stores which Absence Codes (ABS) count towards each Letter in LET – Can be DISTRICT MANAGED. |
| [LET](tables/LET.md) | 256 | SC, ID, PT, HL | Stores Letter data (similar to existing LTR table) – Can be DISTRICT MANAGED. |
| [LGD](tables/LGD.md) | 23,118 | ID, TC, FC, DTM | Logs student detail changes specifically for CALPADS reporting. |
| [LKR](tables/LKR.md) | 5,074 | SC, LK | Contains information about all the lockers in the school |
| [LKR_backup_20260804](tables/LKR_backup_20260804.md) | 5,098 |  |  |
| [LNC](tables/LNC.md) | 10,264 | SC, DT, TN, TY, SE | Utilized through Teacher Portal to report the daily lunch count to the office |
| [LNK](tables/LNK.md) | 0 | SC, UT, SO | Stores the URLs for the Online Resource Center |
| [LOC](tables/LOC.md) | 38 | CD | Schools in the district, one row per school code. |
| [LOG](tables/LOG.md) | 9,192,428 | TID | Records critical changes made to specific data by the users |
| [LSI](tables/LSI.md) | 35 | ID | Contains student legal name and gender data |
| [LTA](tables/LTA.md) | 0 | PID, ID, PT, LD, DY, SE | Stores Attendance data from CAT table for use with Flex Scheduling. Similar to LEA. |
| [LTL](tables/LTL.md) | 106,148 | PID, ID, PT, DT | Logs the Letter Type, Student, Date and User who created Letters. |
| [LTO](tables/LTO.md) | 6 | OID |  |
| [LTR](tables/LTR.md) | 748 | SC, ID | Contains the contents of all letter texts available through Aeries |
| [MDF](tables/MDF.md) | 13 | SC, PI, SQ | Stores Multi Data Profiles Fields to be included |
| [MDL](tables/MDL.md) | 0 | LY | Stores Multi Data Profiles layout colors |
| [MDP](tables/MDP.md) | 5 | SC, PI | Stores Multi Data Profiles basic information |
| [MED](tables/MED.md) | 1,959 | PID, SQ | Health office visit log. |
| [MHS](tables/MHS.md) | 27,249 | PID, SQ | History of Major Medical concerns |
| [MII](tables/MII.md) | 17,514 | PID, SQ | Contains history of details for Medical Insurance |
| [MLG](tables/MLG.md) | 1 | PID, CD, SQ, SQ1 | Logs the dates and times medications are administered to a student |
| [MLI](tables/MLI.md) | 0 | ID |  |
| [MLM](tables/MLM.md) | 1 | PID, CD, SQ | Contains history of details of Medications |
| [MLS](tables/MLS.md) | 0 | ID |  |
| [MNO](tables/MNO.md) | 9,550 | PID, SQ | Contains confidential medical data regarding a student that is usually entered by nurses |
| [MSP](tables/MSP.md) | 0 | SC, CD, SE |  |
| [MSS](tables/MSS.md) | 542 | SC, SE, NM | Contains Master Schedule Settings for use with Google Classrooms. |
| [MST](tables/MST.md) | 2,425 | SC, SE | Master schedule: one row per section offered at a school this year. |
| [MSTM](tables/MSTM.md) | 52 | SC, SN, SQ |  |
| [NAT](tables/NAT.md) | 388 | OID, OTY, SID, TY, CP | Stores data thresholds which will trigger alerts / notifications to be sent. |
| [NAV](tables/NAV.md) | 0 | SC, TYP, CAT, NM |  |
| [NDY](tables/NDY.md) | 0 | SC, DY |  |
| [NTF](tables/NTF.md) | 2,730 | NID |  |
| [NTM](tables/NTM.md) | 0 | SC, TM |  |
| [NTU](tables/NTU.md) | 2,730 | NID, AID |  |
| [NWS](tables/NWS.md) | 0 | SC, SQ | Stores Schools and District News Articles. |
| [NYR](tables/NYR.md) | 0 | YR, TC |  |
| [OAT](tables/OAT.md) | 19,308 | CID, ACD | Oauth |
| [OBC](tables/OBC.md) | 0 | CD | Observation Codes |
| [OBD](tables/OBD.md) | 0 | OTY |  |
| [OBJ](tables/OBJ.md) | 15 | SC, TN, OB | Test objectives for "Teacher Made Test" – Can be DISTRICT MANAGED. |
| [OBL](tables/OBL.md) | 0 | OTY, SC |  |
| [OBO](tables/OBO.md) | 0 | TSQ, CD |  |
| [OBS](tables/OBS.md) | 0 | SQ | Observations |
| [OBT](tables/OBT.md) | 0 | SQ |  |
| [OCM](tables/OCM.md) | 0 | CDS, OCN, OTE |  |
| [ODC](tables/ODC.md) | 0 | CDS, OCN | Used to match incoming courses from Records Transfer with local courses. |
| [ODE](tables/ODE.md) | 58,929 | ID, SQ | Used to track student enrollment outside of your district |
| [ODR](tables/ODR.md) | 0 | ODN | Digital Store Order |
| [OGC](tables/OGC.md) | 1 | SC, CN | Stores courses taken outside the normal grade range that could be in a student's Course History and should be counted as a regular course |
| [OHI](tables/OHI.md) | 0 | SQ | Digital Store Order History |
| [OMT](tables/OMT.md) | 0 | ID, SQ | Stores additional medical tests, including COVID-19 tests. |
| [OPT](tables/OPT.md) | 5,741 | SC, NM | Used by reports and Forms – School wide options which ADD to Variables |
| [PAL](tables/PAL.md) | 0 | SC, LG |  |
| [PAO](tables/PAO.md) | 219,046 | AID, NM | Contains Portal Account Options for use with Google Classrooms. |
| [PAY](tables/PAY.md) | 0 | SC, TN, PN | Record of payments made through the Billing process |
| [PCT](tables/PCT.md) | 0 | SC, SN | Contains data for export for CELDT Pre ID - Can be DISTRICT MANAGED. |
| [PDR](tables/PDR.md) | 0 | FID | Holds the Document Requests |
| [PDT](tables/PDT.md) | 0 | FID, CL | Holds the Translations by CL for Document Requests |
| [PEI](tables/PEI.md) | 0 | ID, SCL | Pre-Enrollment Information |
| [PFS](tables/PFS.md) | 332 | SC, TA, TID | Stores specific Tests selected by administrators to be performed at the school level. |
| [PFT](tables/PFT.md) | 23,990 | PID, TA | Contains results of Physical Performance Testing |
| [PGM](tables/PGM.md) | 46,088 | PID, SQ | Special program participation per student, one row per program spell. |
| [PGR](tables/PGR.md) | 7 | ID, SQ | Programming Screening |
| [PGS](tables/PGS.md) | 28 | PID, SQ, SQ1 | Program Services |
| [PHE](tables/PHE.md) | 0 | SC, SN | Contains data for export for CAHSEE Pre ID – Can be DISTRICT MANAGED |
| [PHL](tables/PHL.md) | 1,721,788 | TID | Stores username, school, student id, date, and page information accessed by parents or students through the Parent Portal, Mobile Portal app, Aeries Student app or other vendor Student apps. |
| [PIC](tables/PIC.md) | 27,277 | ID, YR | Stores student pictures. The table is ID based and it is not cached because of its potential big size. |
| [PNP](tables/PNP.md) | 0 | AID | Aeries Web Only. Contains information about when parents want to receive Weekly Notification Emails. |
| [POP](tables/POP.md) | 20,724 | SC, NM | School-level options as name/value pairs, including grade-posting windows. |
| [PRC](tables/PRC.md) | 17 | ID, SQ, SQ1 | Stores Pre-Referral Intervention Codes. |
| [PRD](tables/PRD.md) | 0 | RSQ, ID, TY, SQ | Stores parent response data for Housing Questionnaire |
| [PRE](tables/PRE.md) | 0 | ID, RD, TID, EOC | Stores Texas Assessment Precode file data. |
| [PRI](tables/PRI.md) | 1,901 | ID, SQ | Stores Pre-Referral Interventions for each student. |
| [PRM](tables/PRM.md) | 525 | NM, OPT |  |
| [PRN](tables/PRN.md) | 93 | ID, SQ, SQ1 | Stores Meetings and Contacts for each Pre-Referral Intervention. |
| [PRR](tables/PRR.md) | 26 | ID, SQ, SQ1 | Stores Reasons and Concerns for each Pre-Referral Intervention. |
| [PRS](tables/PRS.md) | 10,763 | ID, TY, SQ | Stores parent responses to survey items. |
| [PRT](tables/PRT.md) | 184 | SC, RN | Provides alignment of printer to output a variety of reports on preprinted forms |
| [PSA](tables/PSA.md) | 0 | SC, SN | Contains data for export for SABE Pre ID – Can be DISTRICT MANAGED |
| [PSB](tables/PSB.md) | 0 | SC, SN | Contains data for export for Smarter Balanced Pre ID - Can be DISTRICT MANAGED. |
| [PSD](tables/PSD.md) | 0 | SC, ID, PN | Contains Payment Schedules for Billing |
| [PSS](tables/PSS.md) | 1 | ID, SQ | Contains postsecondary survey results from students 6-12 months after their High School Completion |
| [PST](tables/PST.md) | 0 | SC, ID | Defines the Payment Schedules available for Billing |
| [PWA](tables/PWA.md) | 37,944 | AID | Parent and Student Account Management System stores accounts in this table. Self-managing – Can be DISTRICT MANAGED. |
| [PWS](tables/PWS.md) | 38,008 | AID, ID | Stores the students that can be seen by each PWA account. Student numbers are stored by Permanent ID Number – Can be DISTRICT MANAGED |
| [QRY](tables/QRY.md) | 5,785 | SC, QN | Storage of many QUERY statements for use by all users |
| [RAL](tables/RAL.md) | 7 | PID, SQ | Record of those who have accessed the student data, cumulative record or test scores |
| [RCH](tables/RCH.md) | 78,931 | ID, SCL, YR, TM, TY, GP | Aeries Web Only. Contains a running history of report cards that have been created at the end of each marking period. |
| [REL](tables/REL.md) | 0 | SC, SN | Contains Religious information |
| [REQ](tables/REQ.md) | 285 | SC, GRT, CD | Maintains graduation requirements – Can be DISTRICT MANAGED. |
| [RET](tables/RET.md) | 91 | PID, SQ | Record of Retention actions, whether retention occurred or was set aside and for what reason |
| [RFD](tables/RFD.md) | 0 | ID, SQ, SQ1 |  |
| [RFH](tables/RFH.md) | 0 | ID, SQ |  |
| [RFI](tables/RFI.md) | 201 | ID, SQ | Stores Referrals for Intervention for each student. |
| [RFP](tables/RFP.md) | 11 | ID, SQ, SQ1 | Stores Prior Interventions for each Referral for Intervention. |
| [RFR](tables/RFR.md) | 75 | ID, SQ, SQ1 | Stores Reasons and Concerns for each Referral for Intervention. |
| [RFS](tables/RFS.md) | 2 | ID, SQ, SQ1 | Stores Student Strengths for each Referral for Intervention. |
| [RHO](tables/RHO.md) | 1,638 | RID |  |
| [RHS](tables/RHS.md) | 29,495 | RID | Logs reports run in Aeries Web |
| [RJN](tables/RJN.md) | 4 | PID, SQ | Logs parent's protest to data retained in any student record in accordance with California Ed. Code 49070(d) and 49072. |
| [ROL](tables/ROL.md) | 52 | SC | Aeries Web Only. Stores settings used by the New Year Rollover process |
| [RPO](tables/RPO.md) | 36,347 | UID, RON, RO, SR |  |
| [RPP](tables/RPP.md) | 59 | SC, CD, PO | Stores definitions of Reports to be printed in packets for various reasons |
| [RRI](tables/RRI.md) | 0 | ID, SQ, SQ1 | Records Request Items |
| [RRQ](tables/RRQ.md) | 0 | ID, SQ | Records Requests |
| [RT_CHI](tables/RT_CHI.md) | 0 | ID | Records transfer holding table. Stores a copy of incoming CHI data before it's imported. |
| [RT_CST](tables/RT_CST.md) | 0 | RequestID, PID, ID, PT, TA, RT, RP | Records transfer holding table. Stores a copy of incoming CST data before it's imported. |
| [RT_CTS](tables/RT_CTS.md) | 0 | RequestID, PID, DT, NM, ST1 | Records transfer holding table. Stores a copy of incoming CTS data before it's imported. |
| [RT_HIS](tables/RT_HIS.md) | 0 | RequestID, PID, SQ | Records transfer holding table. Stores a copy of incoming HIS data before it's imported. |
| [RT_TST](tables/RT_TST.md) | 0 | RequestID, PID, SQ | Records transfer holding table. Stores a copy of incoming TST data before it's imported. |
| [RTG](tables/RTG.md) | 254,805 | UID, SC, SN, RNM | Report Tags |
| [RTM](tables/RTM.md) | 0 | RID, SQ | Stores system and user messages specific to a records transfer (RTR or RTO) record. |
| [RTO](tables/RTO.md) | 0 | RID | Stores data regarding student records which were requested from another school district. |
| [RTR](tables/RTR.md) | 0 | RID | Stores data regarding student records which are being requested by another school district. |
| [RUN](tables/RUN.md) | 9 | seq | Set of procedures that can be run at night to expedite use of the program during the day |
| [RVM](tables/RVM.md) | 0 | RID, MK | Rubric Value Marks |
| [RVT](tables/RVT.md) | 0 | RID | Rubric Value Types |
| [SAA](tables/SAA.md) | 0 | ID, SSC, PSQ, ASQ | Summer Alternate Course Request Assoc. |
| [SAB](tables/SAB.md) | 0 | SEQ, ID, SSC, SQ | Summer Alternate Course Req. Backup |
| [SAD](tables/SAD.md) | 0 | SC, KY | Contains Performance Indicators against which student success is measured |
| [SAG](tables/SAG.md) | 0 | SC, KY, GR | Stores Student Assessment Definition levels by grade |
| [SAIT](tables/SAIT.md) | 465 | ID, SQ |  |
| [SAP](tables/SAP.md) | 0 | SC, SN, KY | Contains the actual Performance Indicator Scores each student – NEW 5 Levels |
| [SAR](tables/SAR.md) | 0 | ID, SSC, SQ | Summer Alternate Course Requests |
| [SAV](tables/SAV.md) | 0 | SC, SN, SE | Contains Student Schedule Changes for use by the Add/Drop Report |
| [SBC](tables/SBC.md) | 180 | SC, SN, YR, TM, RC | Contains Comments that are given at grading time to an Elementary student |
| [SBD](tables/SBD.md) | 2,928 | ID, SD, SRT, LST | Stores Standards-Based Template Details. |
| [SBE](tables/SBE.md) | 2,528 | GR, RC, SQ | Contains the Categories and Standards selected for Elementary report cards – Can be DISTRICT MANAGED |
| [SBG](tables/SBG.md) | 240,083 | SC, SN, SD, GR, MT, RC | Elementary standards-based report card marks. |
| [SBG_20261026_105401](tables/SBG_20261026_105401.md) | 240,028 |  |  |
| [SBH](tables/SBH.md) | 1,216,671 | PID, SD, YR, MT, GR | History of Grades given to Elementary Students |
| [SBR](tables/SBR.md) | 18,798 | SD, CN | Stores a link between Courses (CRS) and Standards (STN) |
| [SBS](tables/SBS.md) | 62 | ID | Stores Standards-Based Templates. |
| [SBU](tables/SBU.md) | 290 | SC, SEQ | Key to each backup table (i.e. backup title, date, sequence). Aeries Web only at this time. |
| [SBV](tables/SBV.md) | 280 | GR, MK, TY | Contains all possible Grades or Marks and descriptions that might be given to Elementary students – Can be DISTRICT MANAGED |
| [SCD](tables/SCD.md) | 0 | ID, SQ | School of Choice Decisions |
| [SCG](tables/SCG.md) | 0 | SC, CD | School Group School assignments |
| [SCH](tables/SCH.md) | 737 | SQ | Seating Chart Table |
| [SCN](tables/SCN.md) | 0 | ID, SQ, SQ1 | School of Choice Request Notes |
| [SCO](tables/SCO.md) | 1,313 | PID, SQ | Contains history of details of Scoliosis Tests |
| [SCP](tables/SCP.md) | 0 | SC, TN | Contains Student Scrip Purchases |
| [SCR](tables/SCR.md) | 0 | ID, SQ | School of Choice Requests |
| [SCS](tables/SCS.md) | 42,164 | PID, SQ |  |
| [SDT](tables/SDT.md) | 19,696 | SC, SE, ID, SQ | Seating Chart Details |
| [SEC](tables/SEC.md) | 33,310 | SC, SN, SE | Student schedules: which sections each student is enrolled in. Has no entry/exit dates (see CAR for schedule change history). |
| [SED](tables/SED.md) | 8 | EID | Scheduling Exclusions |
| [SFL](tables/SFL.md) | 0 | FID | Student File Storage |
| [SGA](tables/SGA.md) | 30 | AID, GI, LVL | Student Group Analytics |
| [SGD](tables/SGD.md) | 365 | GI | Stores the definition of Student Groups |
| [SGM](tables/SGM.md) | 21,466 | ID, GI | Stores the Students assigned to each Student Group |
| [SGS](tables/SGS.md) | 67 | ID, GI | Stores the Staff assigned to each Student Group |
| [SHS](tables/SHS.md) | 0 | RID |  |
| [SIP](tables/SIP.md) | 0 | RID |  |
| [SKT](tables/SKT.md) | 0 | RID | Skills Type |
| [SLA](tables/SLA.md) | 0 | CD | Service Learning Areas |
| [SLD](tables/SLD.md) | 577 | ID | Aeries Web Only. Contains the specific Service Learning Requirements and Service Learning Hours Completed for each student for each grade level. |
| [SLH](tables/SLH.md) | 570 | ID, CD | Service Learning Hours |
| [SLI](tables/SLI.md) | 0 | ID, RSQ, LSQ, SQ | Aeries Web Only. Contains images and other documents related to each Service Learning Log (SLL) record. |
| [SLL](tables/SLL.md) | 0 | ID, RSQ, SQ | Aeries Web Only. Contains a log of Service Learning Hours worked by students for specific organizations. |
| [SLLP](tables/SLLP.md) | 5,050 | ID, SQ |  |
| [SLO](tables/SLO.md) | 0 | OID | Aeries Web Only. Contains information about organizations that students can donate their time to for building Service Learning Hours. |
| [SLQ](tables/SLQ.md) | 0 | OID, CD | Service Learning Org. Areas |
| [SLR](tables/SLR.md) | 0 | ID, SQ | Aeries Web Only. Contains detailed information about specific organizations that students are donating their time to. |
| [SMB](tables/SMB.md) | 81,447 | SC, SEQ, SE | Exactly like SMS, only stores multiple sets of SMS data based on the number of backups made. Aeries Web only at this time. |
| [SMP](tables/SMP.md) | 0 | SC, CD, SE |  |
| [SMS](tables/SMS.md) | 2,190 | SC, SE | Scheduling: next-year master schedule (planning copy of MST). |
| [SOC](tables/SOC.md) | 57 | CD | Retains specific data, usually Ed Code, which assist in determination of specific Suspension Action – Can be DISTRICT MANAGED |
| [SPC](tables/SPC.md) | 0 | ID | Stores Staff pictures |
| [SPK](tables/SPK.md) | 0 | SC, CD |  |
| [SPP](tables/SPP.md) | 0 | SC, SN, PR | Contains Program Participation for each Student to provide for dis-aggregation of data |
| [SPR](tables/SPR.md) | 0 | SC, SQ | Contains details of Special Programs in which all students at a school are participating |
| [SPS](tables/SPS.md) | 8 | SC, PR | Defines which programs are to be used for dis-aggregation of data |
| [SPT](tables/SPT.md) | 0 | SQ | Aeries Web Only. Used by back-end processes in Aeries Web to determine if the system is performing effectively. |
| [SRB](tables/SRB.md) | 0 | SSC, SEQ, ID, SQ | Summer Requests Backup |
| [SRD](tables/SRD.md) | 0 | ID, TBL | Synchronization Review Date |
| [SRK](tables/SRK.md) | 0 | ID, SQ |  |
| [SRR](tables/SRR.md) | 0 | RID, SQ |  |
| [SSA](tables/SSA.md) | 91 | SSC, TM, SCL | Summer School Availability |
| [SSB](tables/SSB.md) | 324,287 | SC, SEQ, SN, SQ | Exactly like SSS, only stores multiple sets of SSS data based on the number of backups made. Aeries Web only at this time. |
| [SSC](tables/SSC.md) | 100 | SSC, TM, CN | Summer School Courses |
| [SSD](tables/SSD.md) | 19,970 | SC, SN | Contains additional Student Data |
| [SSE](tables/SSE.md) | 0 | SC, SE, ID, SQ | Contains Staff records assigned to Master Schedule sections |
| [SSI](tables/SSI.md) | 0 | ID, SCL |  |
| [SSM](tables/SSM.md) | 0 | SC, SE, ID | Contains Staff records assigned to Scheduling Master Schedule sections |
| [SSO](tables/SSO.md) | 953 | UID | Aeries Web Only. Contains temporary information for facilitating Single-Sign-On capabilities with 3rd party systems. |
| [SSP](tables/SSP.md) | 1 | RID | SAML Service Providers |
| [SSR](tables/SSR.md) | 0 | ID, SSC, SQ | Summer School Course Requests |
| [SSS](tables/SSS.md) | 27,696 | SC, SN, SQ | Scheduling: next-year student schedule requests (planning copy of SEC). |
| [SST](tables/SST.md) | 8 | SSC, TM | Summer School Terms |
| [SSU](tables/SSU.md) | 0 | SC, SEQ, SE, ID | Stores multiple sets of Staff Section data from SSM based on the number of backups made. |
| [STA](tables/STA.md) | 9 | ID, SQ | Contains required information about the current assignments of staff members for State Reporting – Can be DISTRICT MANAGED |
| [STAR](tables/STAR.md) | 0 | NO | Raw test scores imported from the STAR CD |
| [STC](tables/STC.md) | 490 | ID, SQ | Contains required information about the current credentials of staff members for State Reporting – Can be DISTRICT MANAGED |
| [STE](tables/STE.md) | 0 | ID, SQ | Stores imported credential data from standard CTC file layout distributed to counties and districts |
| [STF](tables/STF.md) | 2,290 | ID | Staff demographics (district-wide), keyed by staff ID. |
| [STG](tables/STG.md) | 1,337 | SC, SE, SN | Contains seating chart information – used by Attendance by Photograph in the Teacher Portal |
| [STH](tables/STH.md) | 1,347 | ID, SQ | Stores the Highly Qualified Status for particular NCLB Core Areas for each staff member |
| [STJ](tables/STJ.md) | 1,320 | ID, SQ | Contains job classifications and assignments for each staff member. |
| [STN](tables/STN.md) | 4,813 | SD | Contains all possible Categories and Standards that can be printed on a report card |
| [STO](tables/STO.md) | 0 | SC, ID | Contains Information regarding Stores from which Students can purchase items using scrip |
| [STP](tables/STP.md) | 0 | SC, ID, D1 | Contains Percentages of purchases |
| [STR](tables/STR.md) | 4,285 | RN | Data of all streets, including from-to numbers to determine school of residence and next school |
| [STS](tables/STS.md) | 0 | ID, SQ | Stores State Test Settings. |
| [STU](tables/STU.md) | 20,168 | SC, SN | Student demographics, one row per student per school (SC + SN). STU.ID is the district Permanent ID. |
| [SUIA](tables/SUIA.md) | 6 | ID, SQ |  |
| [SUP](tables/SUP.md) | 19,970 | SC, SN | Supplemental student fields defined by the district (column meanings are district-specific). |
| [SVC](tables/SVC.md) | 0 | SC, ID |  |
| [SWL](tables/SWL.md) | 0 | SCL, SE, ID | Scheduling Master Schedule Wait List |
| [TAA](tables/TAA.md) | 14,518 | UN, SC, LT, KY | Aeries Web Only. Used by the Teacher Portal to store the ways a teacher is associated with students. Populated every time a teacher logs in to Aeries Web. |
| [TAD](tables/TAD.md) | 21 | ID, TA | Stores Testing Administration settings. |
| [TBC](tables/TBC.md) | 0 | SC, TN, CY | Contains all of the individual textbook copies and their assignment (who they're checked out to) |
| [TBL](tables/TBL.md) | 0 | TC | Aeries Client Only. The tables to update during Update District Database |
| [TBO](tables/TBO.md) | 1 | SC, KY | Contains options about scanning and hand-entry of textbook assignment data |
| [TBT](tables/TBT.md) | 0 | SC, TN | Contains information about textbook titles including total copies and replacement costs |
| [TCH](tables/TCH.md) | 1,248 | SC, TN | Teachers per school: one row per teacher number. Also used for counselors (STU.CU). |
| [TDF](tables/TDF.md) | 48 | SC, CD | Defines the content of the District's Transcripts |
| [TEX](tables/TEX.md) | 13,428 | PID, SQ | Contains accommodations, modifications and info as to why a student missed a scheduled test |
| [TFL](tables/TFL.md) | 1,947 | FID | Aeries Web Only. Contains the files uploaded by teachers to link with Aeries Web Gradebook Assignments. |
| [TFR](tables/TFR.md) | 496 | RN, TC, FC | Defines which fields and drop downs on a form are required. |
| [TKN](tables/TKN.md) | 0 | UN, TY, VID | Store the token for the upcoming new Aeries Student app. |
| [TNP](tables/TNP.md) | 7,026 | TC, ID, GR, PT, TA, FC | Stores specific Test ID's and the total number that is possible for each part. |
| [TPE](tables/TPE.md) | 1 | SQ | Third Party Extracts |
| [TPN](tables/TPN.md) | 31 | PID | Stores Third Party Names. |
| [TPO](tables/TPO.md) | 3 | PID, NM | Stores Third Party Options for use with Aeries APIs |
| [TPP](tables/TPP.md) | 632 | PID, TC | Stores Third Party Permissions. |
| [TPS](tables/TPS.md) | 24,932 | PID | Stores calculated status for Algebra I, CAHSEE, and Physical Fitness |
| [TRM](tables/TRM.md) | 129 | SC, TM | Term definitions per school: quarters, semesters and year with start/end dates. |
| [TSA](tables/TSA.md) | 306,507 | UN, SC, SN, ID, LT, KY | Aeries Web Only. Used by the Teacher Portal to store which students are linked to a teacher and how. Associated with the TAA table and populated dynamically when a teacher logs in to Aeries Web. |
| [TSD](tables/TSD.md) | 0 | SD | Stores teacher defined standards by class. |
| [TSI](tables/TSI.md) | 0 | ID, SCL, FN, CT1, CT2, CT3 | Temporary Student Information |
| [TSO](tables/TSO.md) | 0 | SD, CN, SID | Stores standard grading options by teacher and class. |
| [TST](tables/TST.md) | 744,415 | PID, SQ | Standardized test score history per student. |
| [tst_backup_gate2025](tables/tst_backup_gate2025.md) | 743,753 |  |  |
| [TTC](tables/TTC.md) | 73 | CO | Contains a list of tables to copy when transferring a student between schools |
| [TTM](tables/TTM.md) | 0 | SC, YR, TM | Stores starting and ending dates for terms defined in HIS for all previous years. CSIS use ONLY. |
| [TTP](tables/TTP.md) | 64 | SC, TBL, TN, PT, SCR | Defines which Test Scores, Activities, Immunizations, Student fields etc. are to print on Transcripts |
| [TXT](tables/TXT.md) | 15 | SC, ID | Stores letters developed in the QUERY Letter Text Editor, some of which can be District Standard |
| [UAO](tables/UAO.md) | 21,773 | UID, NM | Contains User Account Options for use with Google Classrooms. |
| [UCE](tables/UCE.md) | 3,806 | TYP, SC, ID | UC ELC Extract |
| [UGA](tables/UGA.md) | 1,268 | UID, GID | Aeries Web security table to store User and Group Memberships. |
| [UGC](tables/UGC.md) | 0 | UID, TC, FC, CD | Aeries Web security table for code-based security. Currently used only in specific areas of the system such as Financials. |
| [UGN](tables/UGN.md) | 2,252 | UID | Aeries Web security table to store information about Users and Groups. |
| [UGP](tables/UGP.md) | 53,010 | SC, UID, TC, FC, YR | Aeries Web security table to store permissions granted to Users and Groups. |
| [USO](tables/USO.md) | 33,526 | NM, OP | Stores various options for individual users that need to be associated with an individual database |
| [USR](tables/USR.md) | 13,196 | NM, SCH | Aeries Client Only. Stores permissions for the different users to access various schools. |
| [USYSGCOD](tables/USYSGCOD.md) | 6,760 | TC, FC, CD, ST |  |
| [UTZ](tables/UTZ.md) | 50,050 | NM, DT | System Check |
| [VAC](tables/VAC.md) | 30 | VCN, REQ, CON | Utilized to update required immunizations for the current state requirements. |
| [VER](tables/VER.md) | 0 | SC, SH, LI | Contains the sheet numbers of absence verification sheets printed |
| [VIC](tables/VIC.md) | 16 | PID, SQ | Store information for Victims of harassment or any other offenses |
| [VIS](tables/VIS.md) | 322 | PID, SQ | Counseling visit log (simple). |
| [VND](tables/VND.md) | 0 | ID | Vendors for the Textbooks |
| [VSN](tables/VSN.md) | 43,881 | PID, SQ | Contains history of details of Vision Tests |
| [WEB](tables/WEB.md) | 0 | SC, ID | Contains information about the valid users of ABI - Not used for Aeries Web |
| [WGM](tables/WGM.md) | 1 | SC, SQ | Contains global messages displayed to users |
| [WIA](tables/WIA.md) | 0 | ID | Contains the assignment scores for the What If feature available in the Aeries Student app |
| [WIG](tables/WIG.md) | 0 | ID | Contains the student ID, gradebook number, gradebook term and other settings for the What If feature available in the Aeries Student app |
| [WIH](tables/WIH.md) | 0 | ID | Contains score goals and other settings for the What If feature available in the Aeries Student app |
| [WIT](tables/WIT.md) | 2 | PID, SQ | Store information for Witnesses of harassment or any other offenses |
| [WPT](tables/WPT.md) | 4,387 | PID, SQ | Record of Work Permits issued to Students |
| [WPV](tables/WPV.md) | 3 | PID, SQ, SQ1 | Aeries Web Only. Contains information about visits to work places by CTE/ROP teachers when students are interning at places of employment. |
| [WRL](tables/WRL.md) | 5,189,991 | TID | WRL Log |
| [XRF](tables/XRF.md) | 2,540 | SC, SQ | Tool for District to match criteria required by Testing Pre-IDs and location of data in AERIES |
| [XRP](tables/XRP.md) | 413 | PR, TS, SQ |  |
| [YTD](tables/YTD.md) | 720 | SC, TR, PR, GR, TN, SE, MO | Year-to-date attendance totals per student (maintained by Aeries). |
| [ZFS](tables/ZFS.md) | 308 | SC, NM, FN |  |

## Views

| View | Columns | Built from |
|---|---:|---|
| [A list of Deleted ATT records](tables/A_list_of_Deleted_ATT_records.md) | 35 | ATT |
| [A List of Deleted STU records](tables/A_List_of_Deleted_STU_records.md) | 8 | STU |
| [AlexandriaPatrons](tables/AlexandriaPatrons.md) | 12 | COD, STU, TCH |
| [AListofIDNandSTU](tables/AListofIDNandSTU.md) | 15 | IDN, STU |
| [All Orphaned IDN Records](tables/All_Orphaned_IDN_Records.md) | 11 | IDN, STU |
| [AUP_student](tables/AUP_student.md) | 10 | LOC, STU, SUP, TCH |
| [AUP_Teacher](tables/AUP_Teacher.md) | 7 | LOC, TCH |
| [change_in_gpa_q1_to_q2](tables/change_in_gpa_q1_to_q2.md) | 9 | GRD, STU |
| [CLEVER_ADMINS](tables/CLEVER_ADMINS.md) | 7 | TCH |
| [CLEVER_ENROLLMENTS](tables/CLEVER_ENROLLMENTS.md) | 3 | SEC, STU, TCH |
| [CLEVER_SCHOOLS](tables/CLEVER_SCHOOLS.md) | 12 | LOC |
| [CLEVER_SECTIONS](tables/CLEVER_SECTIONS.md) | 13 | CRS, LOC, MST, STU, TCH, TRM |
| [CLEVER_staff](tables/CLEVER_staff.md) | 9 | STF |
| [CLEVER_STUDENTS](tables/CLEVER_STUDENTS.md) | 17 | STU, SUP |
| [CLEVER_TEACHERS](tables/CLEVER_TEACHERS.md) | 7 | TCH |
| [Compass_Learning_Students](tables/Compass_Learning_Students.md) | 37 | PGM, STU, SUP |
| [Compass_Learning_Teachers](tables/Compass_Learning_Teachers.md) | 30 | TCH |
| [CountyDirectCert](tables/CountyDirectCert.md) | 12 | COD, STU |
| [Discovery_Education_Students](tables/Discovery_Education_Students.md) | 12 | STU, SUP |
| [EDGENUITY_TEACHER](tables/EDGENUITY_TEACHER.md) | 8 | TCH |
| [ELLEVATION_ListPersonData](tables/ELLEVATION_ListPersonData.md) | 7 | COD, STF, STJ, TCH |
| [ELLEVATION_ListScheduleData](tables/ELLEVATION_ListScheduleData.md) | 6 | CRS, MST, SEC, STU, TCH |
| [ELLEVATION_ListStudentDemoData](tables/ELLEVATION_ListStudentDemoData.md) | 59 | COD, CSE, LAC, PGM, SSD, STU, SUP |
| [ELLEVATION_ListTestScoreData](tables/ELLEVATION_ListTestScoreData.md) | 18 | STU, TST |
| [ELLEVATION_ListTestScoreData_ELPAC](tables/ELLEVATION_ListTestScoreData_ELPAC.md) | 18 | STU, TST |
| [Emergency_Cards_Elementary_English](tables/Emergency_Cards_Elementary_English.md) | 43 | COD, STU, SUP, TCH |
| [Emergency_Cards_Elementary_Spanish](tables/Emergency_Cards_Elementary_Spanish.md) | 43 | COD, STU, SUP, TCH |
| [eth100](tables/eth100.md) | 5 | STU |
| [eth200](tables/eth200.md) | 5 | STU |
| [eth300](tables/eth300.md) | 5 | STU |
| [eth400](tables/eth400.md) | 5 | STU |
| [eth500](tables/eth500.md) | 5 | STU |
| [eth600](tables/eth600.md) | 5 | STU |
| [eth700](tables/eth700.md) | 5 | STU |
| [eth999](tables/eth999.md) | 5 | STU |
| [ethDistilled](tables/ethDistilled.md) | 5 | STU |
| [FOLLETT_PATRONS](tables/FOLLETT_PATRONS.md) | 11 | COD, CRS, MST, SEC, STU, TCH |
| [FOLLETT_PATRONS_STAFF](tables/FOLLETT_PATRONS_STAFF.md) | 10 | MST, STF, TCH |
| [FOOD_SERVICE_CUSTOMERS](tables/FOOD_SERVICE_CUSTOMERS.md) | 19 | FRE, PWA, PWS, STU, SUP, TCH |
| [Google_Student_Accounts](tables/Google_Student_Accounts.md) | 1 | COD, LOC, STU, SUP |
| [Google_Student_Accounts_Daily](tables/Google_Student_Accounts_Daily.md) | 1 | COD, LOC, STU, SUP |
| [Google_Student_Accounts_Disable_If_No_Permission_Slip](tables/Google_Student_Accounts_Disable_If_No_Permission_Slip.md) | 1 | COD, LOC, STU, SUP |
| [Google_Student_Accounts_Enable_If_Permission_Slip](tables/Google_Student_Accounts_Enable_If_Permission_Slip.md) | 1 | COD, LOC, STU, SUP |
| [Google_Student_Accounts_Reset_All_Passwords](tables/Google_Student_Accounts_Reset_All_Passwords.md) | 1 | COD, LOC, STU, SUP |
| [Google_Student_Accounts_Reset_Daily_Passwords](tables/Google_Student_Accounts_Reset_Daily_Passwords.md) | 1 | COD, LOC, STU, SUP |
| [IEPD](tables/IEPD.md) | 6 | DOC |
| [Illuminate_Student_Accounts](tables/Illuminate_Student_Accounts.md) | 5 | STU, SUP |
| [llm_all_sections](tables/llm_all_sections.md) | 17 | CRS, LOC, MST, SEC, STF, STU, TCH |
| [llm_attendance_daily](tables/llm_attendance_daily.md) | 26 | ABS, ATT, LOC, STU |
| [llm_attendance_summary](tables/llm_attendance_summary.md) | 17 | ABS, ATT, DAY, ENR, LOC, STU |
| [llm_class_rosters](tables/llm_class_rosters.md) | 21 | COD, CRS, LOC, MST, SEC, STF, STU, TCH |
| [llm_course_enrollments](tables/llm_course_enrollments.md) | 27 | COD, CRS, LOC, MST, SEC, STF, STU, TCH |
| [llm_discipline_incidents](tables/llm_discipline_incidents.md) | 29 | ADS, COD, DSP, LOC, STU |
| [llm_elementary_grades](tables/llm_elementary_grades.md) | 17 | LOC, STF, STU, TCH |
| [llm_elementary_teachers](tables/llm_elementary_teachers.md) | 12 | LOC, STF, STU, TCH |
| [llm_elpac_scores](tables/llm_elpac_scores.md) | 22 | COD, LAC, LOC, STU, TST |
| [llm_frpm_status](tables/llm_frpm_status.md) | 15 | COD, FRE, LOC, STU |
| [llm_sed_status](tables/llm_sed_status.md) | 14 | CON, FRE, LOC, STU |
| [llm_special_education](tables/llm_special_education.md) | 18 | COD, CSE, LOC, STU |
| [llm_special_programs](tables/llm_special_programs.md) | 16 | COD, LOC, PGM, STU |
| [llm_staff_roster](tables/llm_staff_roster.md) | 18 | LOC, MST, SEC, STF, TCH |
| [llm_student_contacts](tables/llm_student_contacts.md) | 26 | COD, CON, LOC, STU |
| [llm_student_demographics](tables/llm_student_demographics.md) | 57 | COD, LOC, STU, TCH |
| [llm_student_enrollment](tables/llm_student_enrollment.md) | 20 | COD, ENR, LOC, STF, STU, TCH |
| [llm_student_gpa](tables/llm_student_gpa.md) | 15 | GRD, LOC, STU |
| [llm_student_grades](tables/llm_student_grades.md) | 31 | COD, CRS, GRD, LOC, MST, STF, STU, TCH |
| [llm_student_program_summary](tables/llm_student_program_summary.md) | 18 | COD, CSE, LOC, PGM, STU |
| [llm_suspension_summary](tables/llm_suspension_summary.md) | 15 | ADS, DSP, LOC, STU |
| [llm_teacher_courses](tables/llm_teacher_courses.md) | 21 | COD, CRS, LOC, MST, SEC, STF, TCH |
| [llm_teacher_student_roster](tables/llm_teacher_student_roster.md) | 16 | CRS, MST, SEC, STF, STU, TCH |
| [llm_test_scores](tables/llm_test_scores.md) | 22 | LOC, STU, TST |
| [llm_test_scores_current](tables/llm_test_scores_current.md) | 20 | LOC, STU, TST |
| [MIISS_attendance](tables/MIISS_attendance.md) | 6 | ATT, STU |
| [MIISS_attendance_summary](tables/MIISS_attendance_summary.md) | 17 | ATT, COD, STU |
| [MIISS_DandF](tables/MIISS_DandF.md) | 13 | GRD, STU, TCH |
| [MIISS_elementary_attendance](tables/MIISS_elementary_attendance.md) | 6 | ABS, ATT, STU |
| [MIISS_elementary_office_referrals](tables/MIISS_elementary_office_referrals.md) | 10 | ADS, COD, STU, TRM |
| [MIISS_elementary_tardy](tables/MIISS_elementary_tardy.md) | 8 | ATT, STU, TRM |
| [MIISS_secondary_attendance](tables/MIISS_secondary_attendance.md) | 8 | ABS, ATT, STU |
| [MIISS_secondary_tardy](tables/MIISS_secondary_tardy.md) | 5 | ATT |
| [MIISS_suspensions](tables/MIISS_suspensions.md) | 12 | ADS, COD, DSP, STU |
| [Naviance_Parents](tables/Naviance_Parents.md) | 9 | STU, SUP |
| [Naviance_Student_Courses](tables/Naviance_Student_Courses.md) | 8 | CRS, HIS, MST, SEC, STU, TCH |
| [Naviance_Students](tables/Naviance_Students.md) | 33 | COD, LOC, STU, SUP, TCH |
| [Naviance_Teachers](tables/Naviance_Teachers.md) | 3 | TCH |
| [schoology_courses](tables/schoology_courses.md) | 7 | CRS, MST, SEC, STU, TCH |
| [schoology_enrollments](tables/schoology_enrollments.md) | 6 | CRS, MST, SEC, STU, TCH |
| [schoology_users](tables/schoology_users.md) | 7 | CRS, MST, SEC, STU, TCH |
| [SEIS_Demographic](tables/SEIS_Demographic.md) | 57 | CSE, LOC, SSD, STU, SUP |
| [SEIS_Discipline](tables/SEIS_Discipline.md) | 11 | CSS, STU, TRM |
| [SLUSD_ACADEMY_SEC](tables/SLUSD_ACADEMY_SEC.md) | 5 | SEC, STU |
| [SLUSD_ACADEMY_SSS](tables/SLUSD_ACADEMY_SSS.md) | 5 | SSS, STU |
| [SLUSD_ALL_STUDENT_PORTAL_ACCOUNTS](tables/SLUSD_ALL_STUDENT_PORTAL_ACCOUNTS.md) | 78 | LOC, STU, TCH |
| [SLUSD_attendance_Rates_by_program](tables/SLUSD_attendance_Rates_by_program.md) | 10 | AHS |
| [SLUSD_AUTHORIZATIONS](tables/SLUSD_AUTHORIZATIONS.md) | 12 | AUT, COD, DAY, LOC, STU |
| [SLUSD_CSSB_ELA_HIS](tables/SLUSD_CSSB_ELA_HIS.md) | 17 | CRS, DAY, HIS, STU |
| [SLUSD_CSSB_ELA_WL_PROFICIENCY](tables/SLUSD_CSSB_ELA_WL_PROFICIENCY.md) | 13 | CST, CTL, CTS, STU, TST, USYSGCOD |
| [SLUSD_CSSB_WORLD_LANG_HIS](tables/SLUSD_CSSB_WORLD_LANG_HIS.md) | 17 | CRS, DAY, HIS, STU |
| [SLUSD_DAILY_ENROLLMENT](tables/SLUSD_DAILY_ENROLLMENT.md) | 11 | DAY, ENR, LOC |
| [SLUSD_demographics](tables/SLUSD_demographics.md) | 17 | COD, CSE, DAY, PGM, STU, SUP, TCH |
| [SLUSD_DoNotPhotograph](tables/SLUSD_DoNotPhotograph.md) | 9 | AUT, STU |
| [SLUSD_Edgenuity_Students](tables/SLUSD_Edgenuity_Students.md) | 28 | STU, SUP |
| [SLUSD_Edgenuity_Teachers](tables/SLUSD_Edgenuity_Teachers.md) | 8 | TCH |
| [SLUSD_elementary_daily_attendance](tables/SLUSD_elementary_daily_attendance.md) | 11 | ABS, ATT, DAY, ENR, STU |
| [SLUSD_elementary_demographics](tables/SLUSD_elementary_demographics.md) | 10 | COD, CSE, STU, SUP, TCH |
| [SLUSD_eTrition](tables/SLUSD_eTrition.md) | 28 | CON, DAY, ENR, FRE, PWA, PWS, STU, SUP, TCH |
| [SLUSD_eTrition_Hosted_Aeries](tables/SLUSD_eTrition_Hosted_Aeries.md) | 21 | ATT, DAY, ENR, STU, TCH |
| [SLUSD_FTE](tables/SLUSD_FTE.md) | 8 | STU, TCH |
| [slusd_grades](tables/slusd_grades.md) | 9 | GRD |
| [slusd_grades_COVID19](tables/slusd_grades_COVID19.md) | 13 | CRS, GRD, TCH |
| [SLUSD_Instructional_Minutes](tables/SLUSD_Instructional_Minutes.md) | 22 | CCD, CCL, CRS, IMC, LOC, MST, TCH |
| [SLUSD_Lersun_class_enrollment_AUP](tables/SLUSD_Lersun_class_enrollment_AUP.md) | 2 | CRS, MST, SEC, STU, TCH |
| [SLUSD_Lersun_classes_AUP](tables/SLUSD_Lersun_classes_AUP.md) | 4 | COD, CRS, LOC, MST, SEC, STU, TCH |
| [SLUSD_Lersun_students_AUP](tables/SLUSD_Lersun_students_AUP.md) | 10 | LOC, STU, TCH |
| [SLUSD_MARKS_GRD](tables/SLUSD_MARKS_GRD.md) | 15 | COD, CRS, DAY, GRD, STU |
| [SLUSD_MARKS_GRD_HIS](tables/SLUSD_MARKS_GRD_HIS.md) | 18 | COD, CRS, DAY, GRD, HIS, MST, STU, SUP, TCH |
| [SLUSD_MARKS_HIS](tables/SLUSD_MARKS_HIS.md) | 14 | CRS, DAY, HIS, STU |
| [SLUSD_Missing_Attendance](tables/SLUSD_Missing_Attendance.md) | 7 | ASL, CAR, MST |
| [SLUSD_MISSING_PORTAL_ACCOUNTS](tables/SLUSD_MISSING_PORTAL_ACCOUNTS.md) | 77 | LOC, PWA, PWS, STU, TCH |
| [SLUSD_MISSING_PORTAL_ACCOUNTS_Elementary](tables/SLUSD_MISSING_PORTAL_ACCOUNTS_Elementary.md) | 76 | LOC, PWA, PWS, STU, TCH |
| [SLUSD_MISSING_PORTAL_ACCOUNTS_Secondary](tables/SLUSD_MISSING_PORTAL_ACCOUNTS_Secondary.md) | 76 | LOC, PWA, PWS, STU, TCH |
| [SLUSD_NEW_YEAR_PROJECTION](tables/SLUSD_NEW_YEAR_PROJECTION.md) | 29 | CSE, STU, SUP, TCH |
| [SLUSD_NEW_YEAR_PROJECTION_CURRENT_YEAR](tables/SLUSD_NEW_YEAR_PROJECTION_CURRENT_YEAR.md) | 27 | CSE, STU, TCH |
| [SLUSD_ParentSquare_Parents](tables/SLUSD_ParentSquare_Parents.md) | 11 | CON, STU |
| [SLUSD_PeachJar_Parent_Email](tables/SLUSD_PeachJar_Parent_Email.md) | 4 | CON, STU |
| [SLUSD_RLSTAR](tables/SLUSD_RLSTAR.md) | 8 | TST |
| [SLUSD_SAME_PERIOD_COURSES](tables/SLUSD_SAME_PERIOD_COURSES.md) | 6 | CRS, MST, TCH |
| [SLUSD_SAME_PERIOD_COURSES_NOT_FILTERED](tables/SLUSD_SAME_PERIOD_COURSES_NOT_FILTERED.md) | 6 | CRS, MST, TCH |
| [SLUSD_secondary_demographics](tables/SLUSD_secondary_demographics.md) | 8 | COD, CSE, STU, SUP, TCH |
| [SLUSD_Secondary_MOU_All_Data](tables/SLUSD_Secondary_MOU_All_Data.md) | 11 | CAR, CRS, DAY, MST, TCH |
| [SLUSD_Secondary_MOU_Overage_Only](tables/SLUSD_Secondary_MOU_Overage_Only.md) | 10 | CAR, CRS, DAY, MST, TCH |
| [SLUSD_Secondary_NoShow_status](tables/SLUSD_Secondary_NoShow_status.md) | 9 | STU |
| [SLUSD_secondary_student_absences](tables/SLUSD_secondary_student_absences.md) | 10 | ABS, ATT, CAR, CRS, DAY, ENR, STU |
| [SLUSD_secondary_student_all_day_absences](tables/SLUSD_secondary_student_all_day_absences.md) | 15 | ABS, ATT, CAR, DAY, ENR, STU |
| [SLUSD_SLHS_STUDENT_SCHEDULES](tables/SLUSD_SLHS_STUDENT_SCHEDULES.md) | 15 | CRS, MST, SEC, STU, TCH |
| [SLUSD_SPACE_AVAILABLE](tables/SLUSD_SPACE_AVAILABLE.md) | 8 | STU, TCH |
| [SLUSD_SpED_Suspensions](tables/SLUSD_SpED_Suspensions.md) | 14 | ADS, COD, CSE, DAY, DSP, STU, SUP |
| [SLUSD_STUDENT_SCHEDULES_SLHS](tables/SLUSD_STUDENT_SCHEDULES_SLHS.md) | 15 | CRS, MST, SEC, STU, TCH |
| [SLUSD_VPC_CODES](tables/SLUSD_VPC_CODES.md) | 22 | LOC, MST, SEC, STU, TCH |
| [SLUSD_warm_body_count](tables/SLUSD_warm_body_count.md) | 18 | LOC, STU, TCH |
| [SLUSD_warm_body_elementary_absences](tables/SLUSD_warm_body_elementary_absences.md) | 4 | ABS, ATT, ENR, STU |
| [SLUSD_warm_body_elementary_totals](tables/SLUSD_warm_body_elementary_totals.md) | 17 | ABS, ATT, DAY, ENR, LOC, STU, TCH |
| [SLUSD_warmbody_secondary_absences](tables/SLUSD_warmbody_secondary_absences.md) | 7 | ATT, CAR, CRS, DAY, ENR, STU |
| [SLUSD_warmbody_secondary_enrollment](tables/SLUSD_warmbody_secondary_enrollment.md) | 15 | CAR, CRS, DAY, MST, STU, TCH |
| [XHIS](tables/XHIS.md) | 40 | DAY, HIS |
| [XHIS_LIST](tables/XHIS_LIST.md) | 40 | DAY, HIS |
