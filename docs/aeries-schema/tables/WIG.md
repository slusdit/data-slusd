# WIG

Contains the student ID, gradebook number, gradebook term and other settings for the What If feature available in the Aeries Student app

Rows: 0 · Primary key: ID · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| SID | int |  |  |  |
| SC | smallint |  |  | → LOC |
| GN | int |  |  |  |
| TM | varchar(1) |  |  |  |
| TI | nvarchar(50) |  |  |  |
| UN | varchar(255) |  |  |  |
| UTY | varchar(10) |  |  |  |
| OID | int |  |  |  |
| DT | datetime |  |  |  |
| DF | bit |  |  |  |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: WIG.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: WIG.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **WIA**: WIA.WID = WIG.ID
- **WIH**: WIH.WID = WIG.ID
