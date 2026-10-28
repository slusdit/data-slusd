# LAC

English learner / language assessment record per student.

Aeries: Contains info about ESL students as well as info about initial tests taken by the student – Can be DISTRICT MANAGED.

Rows: 43,783 · Primary key: ID · Columns: 122

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| USE | datetime | yes | US entry date |  |
| USS | datetime | yes | US school entry date |  |
| EOS | smallint |  |  |  |
| EOL | smallint |  |  | COD LAC.EOL (5 codes) |
| ERS | smallint |  |  |  |
| ERL | smallint |  |  | COD LAC.ERL (5 codes) |
| EWS | smallint |  |  |  |
| EWL | smallint |  |  | COD LAC.EWL (5 codes) |
| ECL | smallint |  |  | COD LAC.ECL (5 codes) |
| ELF | varchar(4) |  |  |  |
| SOS | smallint |  |  |  |
| SOL | smallint |  |  |  |
| SRS | smallint |  |  |  |
| SRL | smallint |  |  |  |
| SWS | smallint |  |  |  |
| SWL | smallint |  |  |  |
| SCL | smallint |  |  |  |
| SLF | varchar(4) |  |  |  |
| SRP | smallint |  |  |  |
| SRG | smallint |  |  |  |
| SLP | smallint |  |  |  |
| SLG | smallint |  |  |  |
| SMP | smallint |  |  |  |
| SMG | smallint |  |  |  |
| ELK | varchar(1) |  |  |  |
| RD1 | datetime | yes | Reclassification date |  |
| RD2 | datetime | yes |  |  |
| RD3 | datetime | yes |  |  |
| EID | datetime | yes |  |  |
| ECS | smallint |  |  |  |
| SID | datetime | yes |  |  |
| SCS | smallint |  |  |  |
| ETD | datetime | yes |  |  |
| EIT | varchar(6) |  |  | COD LAC.EIT (2 codes) |
| SIT | varchar(6) |  |  | COD LAC.SIT (4 codes) |
| CO | nvarchar(max) |  |  |  |
| OID | datetime | yes |  |  |
| OIT | varchar(6) |  |  | COD LAC.OIT (3 codes) |
| OOS | smallint |  |  |  |
| OOL | smallint |  |  |  |
| ORS | smallint |  |  |  |
| ORL | smallint |  |  |  |
| OWS | smallint |  |  |  |
| OWL | smallint |  |  |  |
| OCS | smallint |  |  |  |
| OCL | smallint |  |  |  |
| OLF | varchar(4) |  |  |  |
| L1 | varchar(2) |  |  |  |
| L2 | varchar(2) |  |  |  |
| L3 | varchar(2) |  |  |  |
| L4 | varchar(2) |  |  |  |
| L5 | varchar(2) |  |  |  |
| PR | varchar(1) |  |  | COD LAC.PR (4 codes) |
| LD | varchar(4) |  |  | COD LAC.LD (11 codes) |
| SD | datetime | yes |  |  |
| ED | datetime | yes | EL program entry date |  |
| YP | money |  |  |  |
| LI | varchar(2) |  |  |  |
| RFD | datetime | yes |  |  |
| ECE | varchar(1) |  |  | COD LAC.ECE (2 codes) |
| SR | varchar(3) |  |  | COD LAC.SR (6 codes) |
| STS | datetime | yes |  |  |
| RD4 | datetime | yes |  |  |
| RD5 | datetime | yes |  |  |
| RC1 | varchar(3) |  |  |  |
| RC2 | varchar(3) |  |  |  |
| RC3 | varchar(3) |  |  |  |
| RC4 | varchar(3) |  |  |  |
| RC5 | varchar(3) |  |  |  |
| U1 | varchar(2) |  |  |  |
| U2 | varchar(2) |  |  |  |
| U3 | varchar(2) |  |  |  |
| U4 | varchar(2) |  |  |  |
| U5 | varchar(2) |  |  |  |
| ELP | varchar(1) |  |  |  |
| ELS | smallint |  |  |  |
| ELL | smallint |  |  |  |
| ESS | smallint |  |  |  |
| ESL | smallint |  |  |  |
| SLS | smallint |  |  |  |
| SLL | smallint |  |  |  |
| SSX | smallint |  |  |  |
| SSL | smallint |  |  |  |
| OLS | smallint |  |  |  |
| OLL | smallint |  |  |  |
| OSS | smallint |  |  |  |
| OSL | smallint |  |  |  |
| RD6 | datetime | yes |  |  |
| RC6 | varchar(3) |  |  |  |
| DC | datetime | yes |  |  |
| IFD | datetime | yes |  |  |
| EAC | varchar(4) |  |  |  |
| EAD | datetime | yes |  |  |
| LT | varchar(1) |  |  |  |
| YEL | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| ITF | varchar(4) |  |  |  |
| ITD | datetime | yes |  |  |
| US3 | datetime | yes |  |  |
| IFE | varchar(1) |  |  |  |
| YUS | varchar(1) |  |  |  |
| RD7 | datetime | yes |  |  |
| RC7 | varchar(3) |  |  |  |
| EVS | smallint |  |  |  |
| EVL | smallint |  |  |  |
| SVS | smallint |  |  |  |
| SVL | smallint |  |  |  |
| OVS | smallint |  |  |  |
| OVL | smallint |  |  |  |
| HLD | datetime | yes |  |  |
| AES | datetime | yes |  |  |
| HCB | nvarchar(255) |  |  |  |
| SRC | nvarchar(6) |  |  |  |
| HLH | varchar(255) |  |  |  |
| SNM | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: LAC.ID = IDN.ID
- inferred → **STU**: LAC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **LAF**: LAF.ID = LAC.ID
- **LAS**: LAS.ID = LAC.ID

## Used in views

`ELLEVATION_ListStudentDemoData`, `llm_elpac_scores`

## Used in saved reports

"TBD EL Count - Student List", "TBD EL Count - Summary"
