# CON

Emergency / parent contacts per student.

Aeries: Records of people to be contacted in case of emergency

Rows: 105,510 · Primary key: PID, SQ · Columns: 85

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  | Student identifier | FK → IDN.ID |
| NM | nvarchar(50) |  | Contact name |  |
| AD | varchar(55) |  | Address |  |
| CY | varchar(24) |  | City |  |
| ST | varchar(2) |  | State |  |
| ZC | varchar(5) |  | ZIP code |  |
| TL | varchar(10) |  | Telephone |  |
| ME | nvarchar(max) |  |  |  |
| CD | varchar(2) |  |  | COD CON.CD (9 codes) |
| MT | varchar(1) |  |  |  |
| WP | varchar(10) |  | Work phone |  |
| WX | varchar(5) |  |  |  |
| CP | varchar(10) |  | Cell phone |  |
| PA | varchar(10) |  |  |  |
| EM | varchar(255) |  | Email |  |
| SQ | smallint |  | Contact sequence |  |
| OR | smallint |  |  |  |
| PF | nvarchar(5) |  |  |  |
| FN | nvarchar(20) |  | Contact first name |  |
| MN | nvarchar(20) |  |  |  |
| LN | nvarchar(50) |  | Contact last name |  |
| SF | nvarchar(10) |  |  |  |
| RL | varchar(2) |  | Relationship | COD CON.RL (21 codes) |
| AT | varchar(1) |  |  | COD CON.AT (5 codes) |
| AD2 | varchar(55) |  |  |  |
| ZX | varchar(4) |  |  |  |
| CT1 | varchar(2) |  |  | COD CON.CT1 (23 codes) |
| CN1 | varchar(255) |  |  |  |
| CT2 | varchar(2) |  |  |  |
| CN2 | varchar(255) |  |  |  |
| CT3 | varchar(2) |  |  |  |
| CN3 | varchar(255) |  |  |  |
| CT4 | varchar(2) |  |  |  |
| CN4 | varchar(255) |  |  |  |
| VDT | datetime | yes |  |  |
| RF | bit |  |  |  |
| ED | datetime | yes | Educational rights holder flag |  |
| CL | varchar(2) |  |  |  |
| ENM | nvarchar(255) |  |  |  |
| ELC | nvarchar(255) |  |  |  |
| AP | varchar(1) |  |  |  |
| MBR | varchar(6) |  |  |  |
| MDT | datetime | yes |  |  |
| MRA | varchar(6) |  |  |  |
| MSN | varchar(50) |  |  |  |
| MSP | varchar(10) |  |  |  |
| MTG | varchar(1) |  |  |  |
| MU1 | varchar(3) |  |  |  |
| MU2 | varchar(3) |  |  |  |
| MU3 | varchar(3) |  |  |  |
| MU4 | varchar(3) |  |  |  |
| MU5 | varchar(3) |  |  |  |
| LW | varchar(1) |  | Lives with student (1/0) |  |
| C1F | varchar(3) |  |  |  |
| C1D | varchar(50) |  |  |  |
| C2F | varchar(3) |  |  |  |
| C2D | varchar(50) |  |  |  |
| NP | varchar(1) |  | Notification priority |  |
| ERH | varchar(1) |  |  |  |
| AN | varchar(1) |  |  |  |
| PC | varchar(1) |  | Is primary contact (1/0) |  |
| LK | varchar(1) |  |  | COD CON.LK (2 codes) |
| ES | nvarchar(1) |  |  |  |
| BD | datetime | yes |  |  |
| U1 | nvarchar(3) |  |  |  |
| U2 | nvarchar(3) |  |  |  |
| U3 | nvarchar(3) |  |  |  |
| U4 | nvarchar(3) |  |  |  |
| U5 | nvarchar(3) |  |  |  |
| U6 | nvarchar(3) |  |  |  |
| U7 | nvarchar(3) |  |  |  |
| U8 | nvarchar(3) |  |  |  |
| OC | nvarchar(100) |  |  |  |
| TB | nvarchar(3) |  |  |  |
| TBE | datetime | yes |  |  |
| FP | nvarchar(3) |  |  |  |
| FPD | datetime | yes |  |  |
| ELV | varchar(2) |  | Lowest parent education level | COD CON.ELV (6 codes) |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: CON.PID = IDN.ID

## Used in views

`SLUSD_ParentSquare_Parents`, `SLUSD_PeachJar_Parent_Email`, `SLUSD_eTrition`, `llm_sed_status`, `llm_student_contacts`
